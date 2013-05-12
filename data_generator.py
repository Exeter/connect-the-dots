import json
pprint = lambda obj: print(json.dumps(obj, sort_keys=True, indent=4))

#From get_all_profiles.py
people = json.loads(open('data/master.json').read())

#Generates dicts
students = dict((k, v) for k, v in people.items() if 'Grade' in v.keys())
teachers = dict((k, v) for k, v in people.items() if (k not in students.keys()) and ('Courses' in v.keys()))



#Generates courses
courses = {}
for name, student in students.items():
	if 'Courses' in student.keys():
		for course in student['Courses']:
			if course not in courses.keys():
				courses[course] = {'members': [], 'teacher': None}
			courses[course]['members'].append(name)
for name, teacher in teachers.items():
	if 'Courses' in teacher.keys():
		for course in teacher['Courses']:
			try:
				courses[course]['teacher'] = name
			except KeyError:
				pass
#Generates d3.js graph data
def generate_d3():
	graph = {}

	graph['students'] = [v for k,v in students.items()]
	graph['students'] = sorted(graph['students'], key=lambda x: x['UserName'])

	indexof = dict(((v['UserName'], k) for k,v in enumerate(graph['students'])))

	graph['edges'] = [];
	for name, course in courses.items():
		for i, source in enumerate(course['members'][:-1]):
			for target in course['members'][i+1:]:
					# Required
					edge = { 'source': indexof[source], 'target': indexof[target] }
					# Optional
					edge['course'] = name
					edge['teacher'] = course['teacher']

					graph['edges'].append(edge)
	return graph
#Generates statistical data
def generate_stats():
	connections = {}
	for name, course in courses.items():
		for i, source in enumerate(course['members'][:-1]):
			for target in course['members'][i+1:]:
				pair = sorted([str(source), str(target)])
				if 'slee2' not in pair:
					continue
				key = (pair[0] + '_' + pair[1])
				if key not in connections:
					connections[key] = 0
				connections[key] += 1;
	return connections

if __name__ == "__main__":
	#pprint(stuff['d3'])
	pprint(generate_stats())
