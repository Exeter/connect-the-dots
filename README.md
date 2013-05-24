#Exeter Connected

_...Just some fun with Exeter Connect Data_

[Only accessible on the PEA subnet](http://ecc.chickenkiller.com/connected)

Exeter Connected is an interactive visualization and exploration of the Phillips Exeter Academy community.

##Future:
Do some network science investigations, eg.
 - Average shortest path length (degrees of separation)
 - Clustering coefficient



##TODO:

__bold__ : next task

 - Data Categorization
 	- generate course attributes such as
		- course number
		- subject
		- formats
 	- Abstract out courses nodes as "category" nodes
		- class as a category (already implemented)
		- course as a category
		- Dorm as a category
			- Dorm visualizations can be superimposed on a campus map
		- Location as a category
			- Location visualizations can be superimposed on a World map
 - Search
	- Add auto dropdown menu with tab completion, entries with category (class, name, state, etc.)
	- Add connections via search: search for one node, and then select connect-to, and traverse to next node
 - Multiselection
 	- Start by abstrating out node selections with highlights
 	- Implement Wolfram Alpha-like comparison for multiple selections
	- Implement categorical(vs nodal) search selections
 - Visualization
 	- make doublemouseclick into selection lock/popup window with more info
	- make mouseclick on map deselect
	- successive mouseclicks for incremental subgraph dilation
	- Fix the fact that pan/zoom doesn't work when zoomed too out
	- Make highlights show text
 	- Improve distance metric
 	- Make faster
		- Look into d3.js force algorithm, see if can be improved upon
 - Web (Keep GUI simple!)
 	- __Add Color coding legend!__
	- Add welcome screen with dimmed background and basic guide
		- add dimmed background
		- basic operation guide
		- Data last updated
		- UI elements for filtering/edge type
	- Add revisualize button
	- Add loading circle animation for data transfer
	- Add about text in bottom right corner
 - Data
	- Add timestamp for data collection
	- Smoothly integrate/chain Exeter Connect scraper with graph data generator
	- Improve Connect scraper to update profiles in database dynamically, instead of all at once.
 - Other
	- Add license (or not lol)
	- Separate JS from html (so github knows that the majority of the graph is in JS)
	- Think about whether the JSON should be on github...
	- What do I do with jquery and d3 libraries? (for github...)
	- Think about non-exeter hosting
