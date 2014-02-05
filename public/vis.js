var colorschemes = {
	'Grade' : {
		'9': '#46aede',
		'10': '#94e76b',
		'11': '#ffac18',
		'12': '#e32c57'
	}
}
var currentcolorscheme = colorschemes.Grade;
function populatelegend(){
	var dataset = [];
	for (k in currentcolorscheme){
		dataset.push({'k' : k, 'v' : currentcolorscheme[k]});
	}
	var keydict = {
		'9': 'Prep',
		'10': 'Lower',
		'11': 'Upper',
		'12': 'Senior',
	}
	d3.select("#legend").selectAll('div')
		.data(dataset)
		.enter()
		.append("div")
		.html(function(d){
			return '&nbsp;<font color="' + d.v + '">' + '&#x25A0;</font> ' + keydict[d.k];
		});

}

var welcomescreen = new function(){
	var prevdots;
	this.updateprogress = function(alpha){
		var dots = 21 - Math.round(alpha/0.005);
		var str = "[ "
		if(dots != prevdots){
			prevdots = dots;
			var arr = [];
			for (var i = 0; i< 20; i = i + 1){
				if (i < dots){
					arr.push('.');
				}else{
					arr.push(' ');
				}
			}
			str += arr.join(' ') + ' ]';
			$('#progress').text(str);
		}


	};

	this.startvis = function(){
		$parent = $('#welcome');
		$('#horizontal').fadeOut(1000, function(){
			graphscreen.visualize();
			$parent.fadeOut(3000, function(){
				$parent.remove();
			});
		});
	};

}


indexof = {};
data = {};
var svg;
var force;

(function(){
	//populatelegend();
	
	d3.json("./graphdata.json", function(err, info){
		window.info = info;
		if (err) return console.warn(err);

		/* Data Preparation */

		data['nodes'] = [];

		//TODO: Rename isfiltered
		var filterstatus = {
		// 	'category': (is filtered out)
			'mus': true,
			'art': false,
			'pec': true,
			'dan': true,
		}
		function dontwantcourse(course){
			if (course['SubjectCode'] == 'pec') return filterstatus['pec'];
			if (course['SubjectCode'] == 'art') return filterstatus['art'];
			if (course['SubjectCode'] == 'mus') return filterstatus['mus'];
			if (course['SubjectCode'] == 'dan') return filterstatus['dan'];
			//if (course['teacher'] != 'bsea') return true;
			return false;
		}

		var nodeindex = 0;
		/* init student nodes */
		for (username in info.students){
			var student  = info.students[username];
			student['Name'] = student.FirstName + ' ' + student.LastName;
			student['type'] = 'student';
			var neighbors = [];
			if ('Courses' in student){
				for (i in student['Courses']){
					var course = student['Courses'][i];
					neighbors.push(info.classes[course]['ClassCode']);
				}
			}
			student['neighbors'] = neighbors;
			student['key'] = student.Username;

			data['nodes'].push(student);

			indexof[student['Username']] = nodeindex;
			nodeindex += 1;
		}
		/* init course nodes */
		for (coursename in info.classes){
			var course = info.classes[coursename];
			if (dontwantcourse(course)) continue;
			course['neighbors'] = course['Students'];
			course['type'] = 'course'; //type? nodetype? as a css attr?
			course['key'] = course.ClassCode;
			data['nodes'].push(course);

			indexof[course['ClassCode']] = nodeindex;
			nodeindex += 1;
		}

		/* init edges */
		console.log(indexof)
		data['edges'] = [];
		for (coursename in info.classes){
			var course = info.classes[coursename]
			if (dontwantcourse(course)) continue;
			for ( i in course['neighbors']){
				edge = {};
				edge = {'source': indexof[course['ClassCode']], 'target': indexof[course['neighbors'][i]]};
				edge['nodes'] = [course['ClassCode'], course['neighbors'][i]];
				data['edges'].push(edge);
			}
		}
		console.log(data);//TESTING
		svg = d3.select('body').append('svg')
			.attr("id", 'graph')
			.attr("viewBox", "0 0 " + document.body.clientWidth + " " + document.body.clientHeight )
			.attr("preserveAspectRatio", "xMidYMid meet")
			.attr("width", document.body.clientWidth)
			.attr("height", document.body.clientHeight)
			.attr("pointer-events", "all")
			.append('g')
			.call(d3.behavior.zoom()
				.scaleExtent([0.2,5])
				.on("zoom", zoomed))
			.append('g');

		function zoomed() {
			svg
				.attr("transform",
			"translate(" + d3.event.translate + ")"
			+ " scale(" + d3.event.scale + ")");
		}

		svg.attr('transform', "translate(" + document.body.clientWidth/2.5 + ", " + document.body.clientHeight/2.5 + ") scale(0.2)"); //zoom out
		svg.append('rect')
			.attr('width', document.body.clientWidth)
			.attr('height', document.body.clientHeight)
			.attr('fill', 'black')
			.style('stroke-width', '2px')
			.style('stroke', 'white')
			.attr('transform', "translate(-" + document.body.clientWidth*8 + ", -" + document.body.clientHeight*8+ ") scale(20)"); //zoom out

		force = d3.layout.force()
			.gravity(1)
			.charge(-400)
			.linkDistance(1)
			.friction(0.95)
			.alpha(10)
			.size([document.body.clientWidth, document.body.clientHeight]);

		force
			.nodes(data.nodes)
			.links(data.edges)
			.start();

		force.on('tick', function(){
			welcomescreen.updateprogress(force.alpha());
		});

		force.on('end', function(){
			welcomescreen.startvis();
		});

		$('#now').click(welcomescreen.startvis);

	});

	

	/* Visualization */
	var timeout;
	$("#search").keyup(function() {
		var query = $(this).val();
		window.clearTimeout(timeout);
		timeout = setTimeout(function(){
			graphscreen.resethighlights();
			d3.selectAll('.node')
				.filter(function(b,i) {
					if (b.key == query) return i; //username, ClassCode
					if (b.SubjectCode == query) return i;
					if (b.Teacher == query) return i;
					return null;
				})
				.each(function(b, i) {
					graphscreen.highlight(b);
				});

		}, 1000);


		
	});
})();
var graphscreen = new function(){
	this.visualize = function(){
		force.on('end', null);
		force.tick();
		var edge = svg.selectAll('.edge')
			.data(data.edges)
			.enter().append('line')
			.attr('highlighted', false)
			.attr('class', function(d){
			     return ['edge', d.nodes[0], d.nodes[1]].join(' ');
			});
		var node = svg.selectAll('.node')
			.data(data.nodes)
			.enter().append('circle')
			.attr('highlighted', false)
			.attr('id', function(d){
				return d.key;
			})
			.attr('class', function(d){
				var classes = [];
				if ('neighbors' in d) classes = d.neighbors;
				classes.push('node');
				return classes.join(' ');
			})
			.attr('nodetype', function(d){
				return d.type;
			})
			.on("mouseover", this.highlight)
			.on("mouseout", this.resethighlights);
		svg.selectAll('[nodetype=student]')
			.attr('r', 3);
		svg.selectAll('[nodetype=course]')
			.attr('r', 5);

		this.resethighlights(); //default colorings

		node.append("title")
			.text(function(d) {return d.Name});

		force.on('tick', ontick);
		function ontick(){
			edge.attr('x1', function(d) { return d.source.x; })
				.attr('y1', function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });
			node.attr('cx', function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });
		}
		ontick(); //to run when visualized after alpha = 0

	};
	this.resethighlights = function(){
		d3.selectAll('.edge[highlighted=true]')
			.attr('highlighted', false)
			.transition()
			.duration(1000)
			.style('stroke-opacity', '.2');
		d3.selectAll('[nodetype=course]')
			.attr('highlighted', false)
			.transition()
			.duration(1000)
			.style('fill', '#000')
			.style('opacity', 0.8);
		d3.selectAll('[nodetype=student]')
			.attr('highlighted', false)
			.transition()
			.duration(1000)
			.style('fill', function(d){
				return colorschemes.Grade[d.Grade];
			})
			.style('opacity', 1);
	};
	this.highlight = function(d){
		//neightborof?
		d3.selectAll('#' + d.key)
			.attr('highlighted', true)
			.transition()
			.duration(750)
			.style('fill', "fff")
			.style('opacity', "1")
			.style('stroke-opacity', "1");

		d3.selectAll('.' + d.key)
			.attr('highlighted', true)
			.transition()
			.duration(750)
			.style('fill', "ddd")
			.style('opacity', "1")
			.style('stroke-opacity', "1");
		d3.selectAll('.node[highlighted=false]')
			.attr('highlighted', true)
			.transition()
			.duration(750)
			.style('opacity', "0.1");
	};
}
