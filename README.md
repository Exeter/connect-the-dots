#connect-the-dots

Fun with Exeter Connect Data.

##Goal:
Force directed graph 

Current implementation uses d3.js.
Works, but is very slow when uses all 50,000+ edges for computing with the whole school.

##Details:
__Nodes__: Students
 - Color coded by
 	- Year
	- Gender
	- Dorm

__Edges__: Shared class
 - attributes:
 	source, target, class, subject, teacher

_Features_:
 - Filterable by subject, by teacher, by person, by dorm, etc...
 - Classes can be emphasized/de-emphazied by changing weights of edges, i.e. sports-opt edge can have a weight of zero

##TODO:
 - Find statistics of network( average amount of classes in common, etc.)
 - Release data/folder in an encrypted zip folder/ upload on server
 - Implement interactive filtering(by default, try not to visualize whole school)
 - Add color coding legend!
 - Faster, non-browser implementation
