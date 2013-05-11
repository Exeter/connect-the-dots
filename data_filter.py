#!/usr/bin/env python2
import json
pprint = lambda obj: print(json.dumps(obj, sort_keys=True, indent=4))

people = json.loads(open('data/master.json').read())

students = dict((k, v) for k, v in people.items() if 'Grade' in v.keys())
teachers = dict((k, v) for k, v in people.items() if (k not in students.keys()) and ('Courses' in v.keys()))



courses ={}
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
#pprint(teachers)
#pprint(students)
pprint(courses)
