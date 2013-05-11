#!/usr/bin/env python2

from suds.client import Client
from suds.transport.https import HttpAuthenticated
from suds.sudsobject import asdict
from getpass import getpass
import json

def pprint(x):
	print(json.dumps(x, indent=4, sort_keys=True))



profile_url = 'https://connect.exeter.edu/student/_vti_bin/UserProfileService.asmx?WSDL' 

def getclient(url):
	credentials = dict(username = username, password=password)
	t = HttpAuthenticated(**credentials);

	return Client(url, transport=t)



def getprofile(user):
	"""Returns dict of user's information"""
	return getdata(client.service.GetUserProfileByName('i:0#.w|master\\' + user))

def getdata(sudsobject):
	def recursive_asdict(sudsobject):
		"""From http://stackoverflow.com/a/15678861"""
		d = sudsobject
		out = {}
		for k, v in asdict(d).iteritems():
			if hasattr(v, '__keylist__'):
				out[k] = recursive_asdict(v)
			elif isinstance(v, list):
				out[k] = []
				for item in v:
					if hasattr(item, '__keylist__'):
						out[k].append(recursive_asdict(item))
					else:
						out[k].append(item)
			else:
				out[k] = v
		return out
	def getuseful(dirty_dict):
		info = {}
		for x in dirty_dict['PropertyData']:
			if x['Privacy'] == "Private":
				continue
			k = x['Name']
			values = x['Values']
			if values == "":
				continue
			v = []
			for value in values['ValueData']:
				v.append(value['Value'])
			if (len(v) == 1) and (k not in ['Organizations', 'Courses']):
				v = v[0]
			info[k] = v
		return info
	return getuseful(recursive_asdict(sudsobject))

def download_all():
	"""hehe. downloads a lot of data. PLEASE DO NOT RUN, ask slee2 for full data.json"""
	emails = json.loads(open('data/emails.json').read())
	users = [email[:email.index('@')] for email in emails]

	data = {}
	print('Downloading data of %i users' % len(users))
	for index, user in enumerate(users):
		try:
			data[user] = getprofile(user);
		except:
			pass
		print(str(index) + '\t' + user)
	f = open('data/data.json', 'w')
	f.write(json.dumps(data))
if __name__ == '__main__':
	username = raw_input('Username: ') + '@exeter.edu'
	password = getpass()
	client = getclient(profile_url)
	f = open('data/slee2.json', 'w')
	f.write(json.dumps(getprofile('slee2'), indent=4, sort_keys=True))
	#download_all()
