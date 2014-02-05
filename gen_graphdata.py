import PEA_connect
import json

classes = PEA_connect.classes()
users = PEA_connect.users()

#TEMPORARY student retrieval
students = dict((k, v) for k, v in users.items() if 'SourceCode' in v.keys() and "ST" in v['SourceCode'].split(','))


def generate_data():
	output = {}
	output['students'] = students
	output['classes'] = classes

	return output
if __name__ == '__main__':
	print(json.dumps(generate_data(), indent=4, sort_keys=True))
