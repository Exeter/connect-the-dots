#Exeter Connected

_...Just some fun with Exeter Connect Data_

[Only accessible on the PEA subnet](http://ecc.chickenkiller.com/connected)

Exeter Connected is an interactive visualization and exploration of the Phillips Exeter Academy community.

##Future:
Do some network science investigations, eg.
 - Average shortest path length (degrees of separation)
 - Clustering coefficient

##TODO:
 - Search
	- Add auto dropdown menu with tab completion, entries with category (class, name, state, etc.)
 - Multiselection
 	- Implement Wolfram Alpha-like comparison for multiple selections
 	- Implement graph node lassoing selections
	- Implement categorical(vs nodal) search selections
 - Visualization
 	- Remove mouseover, replace with mouseclick
	- successive mouseclicks for incremental subgraph dilation
	- Fix the fact that pan/zoom doesn't work when zoomed too out
	- Make highlights show text
 	- Make more constellation-like with edge highlighting
 	- Fix Alex Hernandex glitch
 	- Improve distance metric
 	- Make faster
 - Web (Keep GUI simple!)
 	- Add Color coding legend!
	- Add welcome screen with dimmed background and basic guide
		- add dimmed background
		- basic operation guide
		- UI elements for filtering/edge type
	- Add revisualize button
	- Add loading circle animation for data transfer
 - Data
	- Add timestamp for data collection
	- Smoothly integrate/chain Exeter Connect scraper with graph data generator
	- Improve Connect scraper to update profiles in database dynamically, instead of all at once.
	- Write update scripts
 - Other
	- Add license (or not lol)
	- Separate JS from html (so github knows that the majority of the graph is in JS)
	- Think about whether the JSON should be on github...
