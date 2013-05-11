#connect-the-dots

Fun with Exeter Connect Data.

##Goal:
Force directed graph 

##Details:
###Mode A
__Nodes__: Students

__Edges__: Shared class

_Features_:
 - Each class will have a default weight of 1.
 - Filterable by subject, by teacher, by person, by dorm, etc...
 - Classes can be emphasized/de-emphazied by changing weights of edges, i.e. sports-opt edge can have a weight of zero

###Mode B
__Nodes__: Class

__Edges__: Shared Students

##TODO:

 - Implement basic d3 force directed graph
 - Release data/folder in an encrypted zip folder
 - port to processing.js?
