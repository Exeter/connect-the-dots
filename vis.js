var students = [];
d3.json("./data/students.json", function( err, data){
	if(err) return console.warn(err);
	for(name in data){
		students.push(data[name]);
	}
	visualize();
});
function visualize(){
	//IMPLEMENT!

}
