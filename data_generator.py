import json
import re
import string
pprint = lambda obj: print(json.dumps(obj, sort_keys=True, indent=4))

#From get_all_profiles.py
people = json.loads(open('data/master.json').read())

#Generates dicts
students = dict((k, v) for k, v in people.items() if 'Grade' in v.keys())
for k,v in students.items():
	v['key'] = k
teachers = dict((k, v) for k, v in people.items() if (k not in students.keys()) and ('Courses' in v.keys()))



#Generates courses
courses = {}
for name, student in students.items():
	if 'Courses' in student.keys():
		for course in student['Courses']:
			if course not in courses.keys():
				if course[:course.index(' ')] != "13/SP": # Weed out Exeter Connect private lesson glitches
					continue
				info = course[course.rfind('/') + 1:].split('-')


				courses[course] = {'members': [], 'teacher': None}
				courses[course]['name'] = course[course.index(' ') + 1:re.search(r'[*(]',course).start()].strip()
				courses[course]['title'] = course;
				courses[course]['subject'] = info[0]
				courses[course]['code'] = info[1]
				courses[course]['formats'] = list(filter(lambda x: x in string.ascii_letters, info[2]))
				courses[course]['key'] = '-'.join(info)
			courses[course]['members'].append(name)
#Adds teachers to courses
for name, teacher in teachers.items():
	if 'Courses' in teacher.keys():
		for course in teacher['Courses']:
			try:
				courses[course]['teacher'] = name
			except KeyError:
				pass

#Generates d3.js graph data
def generate_d3old():
	graph = {}

	graph['students'] = [v for k,v in students.items()]
	graph['students'] = sorted(graph['students'], key=lambda x: x['UserName'])

	graph['indexof'] = dict(((v['UserName'], k) for k,v in enumerate(graph['students'])))

	graph['edges'] = [];
	for name, course in courses.items():
		for i, source in enumerate(course['members'][:-1]):
			for target in course['members'][i+1:]:
					# Required
					edge = { 'source': source, 'target': target }
					# Optional
					edge['course'] = name
					edge['teacher'] = course['teacher']

					graph['edges'].append(edge)
	return graph
def generate_data():
	output = {}

	"""
	output['students'] = [v for k,v in students.items()]
	output['students'] = sorted(output['students'], key=lambda x: x['UserName'])
	
	output['student_index_of'] = dict(((v['UserName'], k) for k,v in enumerate(output['students'])))
	"""
	output['students'] = students
	output['courses'] = courses
	
	return output


if __name__ == "__main__":
	#pprint(stuff['d3'])
	pprint(generate_data())
