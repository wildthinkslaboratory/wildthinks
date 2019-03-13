
![fullwidth](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/7f5b396d56cbb06748ebcc6fda251d6a10260a0d/banner2.png)




# Relations

Imagine you have a bunch of stuff you want to understand.  It's not random stuff but it's a lot of stuff and it's hard to wrap your head around what's going on.  One strategy we can use to make sense of our data is to just pick up two pieces and compare them.  We can ask a yes or no question like: "Is this one bigger than that one?" or "Are they the same color?". If we make lots and lots of pairwise comparisons and put all of the answers together, a picture emerges and we can see a pattern. In math we call all these pairwise comparisons a relation.

You use relations all the time when you do math, but you may not be aware of them.  Functions, like $f(x) = x + 2$, are relations. Statements like $3 \geq 4$ or $4 \times 3 = 12$ are statements about relations.   Relations give us a way to describe the patterns and relationships we see in the world.  They might describe relationships between numbers or they might describe relationships between other stuff: people, websites, words, ideas, whatever stuff you care about.  

Relations are made from pairs.  So, what's a pair?  It's just two things put together, just as you'd expect. What things?  Anything you want. Lots of things come in pairs.

![fullwidth](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/6d038aa6b0d21ce503d4628a5dff3a292056030d/pairs.jpeg)

In math, the order that we put things together in a pair matters.  Here's a more precise definition of a pair.

# --outlinebox notation
**Definition 1**
If we have two things $a$ and $b$ we can put them together to form the **ordered pair** $$a \rightarrow b.$$  We can change the order to create the pair $b \rightarrow a$.  The order is important and the pair $a \rightarrow b$ is not the same as the pair $b \rightarrow a$.

The **cartesian product** of two sets $A$ and $B$ is the set of all **ordered pairs** $a \rightarrow b$ that can be made with the first element $a$ being chosen from set $A$ and the second element $b$ being chosen from set $B$.  We sometimes use the symbols $A \times B$ to represent this set of ordered pairs.  

The cartesian product of a single set $A$ is the set of all ordered pairs we can make with the first and second element both being chosen from the set $A$.  Note that this includes pairs of the form $a \rightarrow a$ where the first and second element are the same thing.  This set of pairs can be described with the symbols $A \times A$.

[Notes on Notation and Ordered Pairs](::pair_notation/center,shadow)
[Same definition, more math symbols](::math_def_pair/center/shadow)
# --outlinebox

# :::: math_def_pair

# --outlinebox math_pair
**Definition 1** 
For sets $A$ and $B$ the **cartesian product** of $A$ and $B$ is denoted by $A \times B$ and equals
$$\{a \rightarrow b \, | \, a \in A, \, b \in B \}$$

An element $a \rightarrow b$ of $A \times B$ is called an **ordered pair**.
[Close](::math_def_pair)
# --outlinebox
# ::::

# :::: pair_notation
# --aliceblue pair_notation_dec
#### Notation for Ordered Pairs

The arrow notation $a \rightarrow b$ we use for pairs is not the standard notation.  Pairs are more commonly represented by surrounding two elements $a$ and $b$ with parentheses seperated by a comma $(a,b)$.  Most people's introduction to pairs is graphing points on the two dimensional coordinate plane.  
![fullwidth](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/23e062f0eb125b79970538509b95eae7ef38c957/xyplanepairs.jpeg)
In this narrow context, parentheses pairs make fairly good sense, but here we want to talk about pairs in a much bigger more general context.  
The advantage of the arrow notation is that it makes clear the order of the elements in the pair.  It also looks like an edge in a directed graph which is an intuitive model for learning about relations and functions.  So we'll write pairs with arrows $a \rightarrow b$ so long as it avoids confusion with other notations.

 [Close](::pair_notation)
# --aliceblue
# ::::

We can form a cartesian product between two sets of numbers.

#### --aliceblue example1

**Example 1** 
If $A = \\{ 2,3,4 \\}$ and $B = \\{ 3,5 \\}$, then the *cartesian product* $A \times B$ is the set of pairs

$$\{(2,3),(2,5),(3,3),(3,5),(4,3),(4,5)\}$$

#### --aliceblue

In the next example, we take the cartesian product of a set with itself.

#### --aliceblue example2

**Example 2** 
If $A = \\{ 2,3,4 \\}$ then the *cartesian product* $A \times A$ is the set of pairs

$$\{(2,2),(2,3),(2,4),(3,2),(3,3),(3,4),(4,2),(4,3),(4,4)\}$$

#### --aliceblue

We can form pairs and cartesian products from anything we want.  Here's a set of things.

![fullwidth](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/71856e7d81be6577f9ec708902975a8025cb6ba2/functions1.002.jpeg)

Think about all the possible pairs we could make with these things.  There's a lot of them. There are $9$ ways we could pick the first element of a pair and $9$ ways we could pick the second element of the pair.  That's $9 \times 9 = 81$ different pairs we could make. Here's the full cartesian product of them with all $81$ pairs.

![fullwidth](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/1cbeba9f6aa2ac0c759106fa3e534e67c7ea2718/foodweb.jpeg) 



A **relation** is just a subset of those pairs. 
# --outlinebox def_binary_relation

**Definition 2** 
For sets $A$, $B$, any subset of the cartesian product $A \times B$ is called a **binary relation** from $A$ to $B$. Any subset of $A \times A$ is called a **binary relation** on $A$.

# --outlinebox



The following set of pairs is a relation on our stuff.  There is some question that was asked for all $81$ pairs and this collection of pairs are those for which the answer was yes. Take a few moments and see if you guess what the question is.  Then click on the pairs to add them to a graph.  Graphs are a useful way to visualize a relation.  

```d3/autoplay


smartdown.importCssCode(
`
.link {
  stroke: #000;
  stroke-width: 4;
  fill: none;
}

.inactive {
	display: none;
}

`);


var nodes = [
	{
		name: 'fox',
	 	url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/fox.jpeg',
	 	x: 0.25,
	 	y: 0.17,
	 	active: false
	 	},
	{
		name: 'owl',
	 	url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/owl.jpeg',
	 	x: 0.75,
	 	y: 0.17,
	 	active: false 
	 	},
	{
		name: 'rabbit',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/rabbit.jpeg',
	 	x: 0.125,
	 	y: 0.5,
	 	active: false 
	 	},
	{
		name: 'mouse',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/mouse.jpeg',
	 	x: 0.375,
	 	y: 0.5,
	 	active: false  
	 	},
	{
		name: 'bird',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/bird.jpeg',
	 	x: 0.625,
	 	y: 0.5,
	 	active: false  
	 	},
	{
		name: 'cricket',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/cricket.jpeg',
	 	x: 0.875,
	 	y: 0.5,
	 	active: false  
	 	},
	{
		name: 'wheat',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/wheat.jpeg',
	 	x: 0.83,
	 	y: 0.83,
	 	active: false  
	 	},
	{
		name: 'grass',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/grass.jpeg',
	 	x: 0.5,
	 	y: 0.83,
	 	active: false  
	 	},
	{
		name: 'carrot',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/carrot.jpeg',
	 	x: 0.17,
	 	y: 0.83,
	 	active: false  
	 	} 
];

var links = [
  {source: 0, target: 2, exitAdj: 'W', enterAdj: 'N', id: 0, active: true},
  {source: 0, target: 3, exitAdj: 'S', enterAdj: 'N', id: 1, active: true},
  {source: 0, target: 4, exitAdj: 'E', enterAdj: 'N', id: 2, active: true},
  {source: 1, target: 3, exitAdj: 'W', enterAdj: 'E', id: 3, active: true},
  {source: 1, target: 5, exitAdj: 'S', enterAdj: 'N', id: 4, active: true},
  {source: 2, target: 7, exitAdj: 'S', enterAdj: 'N', id: 5, active: true},
  {source: 2, target: 8, exitAdj: 'S', enterAdj: 'N', id: 6, active: true},
  {source: 3, target: 6, exitAdj: 'S', enterAdj: 'W', id: 7, active: true},
  {source: 4, target: 5, exitAdj: 'E', enterAdj: 'W', id: 8, active: true},
  {source: 4, target: 6, exitAdj: 'S', enterAdj: 'N', id: 9, active: true},
  {source: 5, target: 6, exitAdj: 'S', enterAdj: 'N', id: 10, active: true},
  {source: 5, target: 7, exitAdj: 'S', enterAdj: 'E', id: 11, active: true}
];

var dagLinks = [];


	


var target = this.div;
target.style.height = '100%';
target.style.width = '96%';
const pageWidth = target.offsetWidth;
const width = pageWidth * 0.75;
const xDivider = width * 0.25;
const height = width * 0.66;
const imgSize = height/6;
const linkImageSize = height/ links.length;
const linkWidth = xDivider/4;



function xAdjustment(heading) {
	if (heading == 'E') {
		return imgSize/2;
	}
	else if (heading == 'W') {
		return -imgSize/2;
	}
	return 0;
}

function yAdjustment(heading) {
	if (heading == 'S') {
		return imgSize/2;
	}
	else if (heading == 'N') {
		return -imgSize/2;
	}
	return 0;
}

var svg = d3.select(target)
			.append('svg')
			.attr('width',pageWidth)
			.attr('height', height);

	// define arrow markers for graph links
	svg.append('svg:defs').append('svg:marker')
    .attr('id', 'end-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 6)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
  	.append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#000');


var pairs =	svg.selectAll('g')
   		.data(links)
   		.enter()
   		.append('g')
   		.attr('class', 'pair')
   		.on('click', function(d,i) {
   			if (d.active == true) {
        		dagLinks.push(d);
      			d.active = false;
      			nodes[d.source].active = true;
      			nodes[d.target].active = true;
        		render();	
			}
   		});


  	pairs.append('image')
  		.attr('xlink:href', function(l) {
			var sourceNode = nodes.filter(function(d, i) {
       		return i == l.source;
     		})[0];
			return sourceNode.url;
		})
		.attr('x', linkWidth/2)
		.attr('y', function(d) {
			return d.id * linkImageSize;
		})
		.attr('width',linkImageSize - 5)
		.attr('height',linkImageSize - 5);

	pairs.append('image')
		.attr('xlink:href', function(l) {
			var targetNode = nodes.filter(function(d, i) {
       		return i == l.target;
     		})[0];
			return targetNode.url;
		})
		.attr('x', 2*linkWidth + linkWidth/2)
		.attr('y', function(d) {
			return d.id * linkImageSize;
		})
		.attr('width',linkImageSize - 5)
		.attr('height', linkImageSize - 5);


	pairs.append('line')
		.classed('link', true)
  		.attr('x1', 1.5 * linkWidth)
  		.attr('y1', function(d) {return (d.id + 1) * linkImageSize - linkImageSize/2;})
  		.attr('x2', 2.25 * linkWidth)
  		.attr('y2', function(d) {return (d.id + 1) * linkImageSize - linkImageSize/2;})
  		.attr("marker-end", "url(#end-arrow)");

const duration = 2000;

function render() {

	svg.selectAll('g.pair')
		.data(links)
		.filter(function(d) { return d.active == false; })
		.classed('inactive', true);


  	svg.selectAll('node_image')
    .data(nodes.filter(function(d){ return d.active == true; }))
  	.enter()
  	.append('image')
	.attr('xlink:href', function(d) {
		return d.url;
		})
	.attr('x', function(d) {
		return d.x * width - imgSize/2 + xDivider;
		} )
	.attr('y', function(d) {
		return d.y * height - imgSize/2;
		})
	.attr('width',imgSize)
	.attr('height',imgSize);

	svg.selectAll('link') 
	.data(dagLinks)
	.enter();

	svg.selectAll("link")
   .data(dagLinks)
   .enter()
   .append("path")
   .attr("class", "link")
   .attr("d", function(l) {
   	var sourceNode = nodes.filter(function(d, i) {
       return i == l.source;
     })[0];
    const targetNode = nodes.filter(function(d, i) {
       return i == l.target;
     })[0];
    const xStart = xDivider + sourceNode.x * width + xAdjustment(l.exitAdj);
    const yStart = sourceNode.y * height + yAdjustment(l.exitAdj);
    const xControlPt1 = xStart + xAdjustment(l.exitAdj);
    const yControlPt1 = yStart + yAdjustment(l.exitAdj);
    const xEnd = xDivider + targetNode.x * width + xAdjustment(l.enterAdj);
    const yEnd = targetNode.y * height + yAdjustment(l.enterAdj);
    const xControlPt2 = xEnd + xAdjustment(l.enterAdj);
    const yControlPt2 = yEnd + yAdjustment(l.enterAdj);
    return `M ${xStart}, ${yStart} C ${xControlPt1}, ${yControlPt1} 
    		${xControlPt2}, ${yControlPt2} 
    		${xEnd}, ${yEnd}`;
   	})
   .attr("marker-end", "url(#end-arrow)");

  svg.selectAll('link')
  .data(dagLinks)
  .exit()
  .remove();

}



```

This mathematical relation describes a food web between these plants and animals.   The predators are on the top of the hierarchy and have only outgoing arrows. The plants are on the bottom and have only incoming arrows. The question is "Will the first thing eat the second thing?"

Ok, here's a different relation on the same set of stuff.  What do you think this relation represents?  Click on the pairs to create a graph.

```d3/autoplay


smartdown.importCssCode(
`
.link {
  stroke: #000;
  stroke-width: 4;
  fill: none;
}

.inactive {
	display: none;
}

`);


var nodes = [
	{
		name: 'fox',
	 	url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/fox.jpeg',
	 	x: 0.25,
	 	y: 0.17,
	 	active: false
	 	},
	{
		name: 'owl',
	 	url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/owl.jpeg',
	 	x: 0.83,
	 	y: 0.17,
	 	active: false 
	 	},
	{
		name: 'rabbit',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/rabbit.jpeg',
	 	x: 0.125,
	 	y: 0.5,
	 	active: false 
	 	},
	{
		name: 'mouse',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/mouse.jpeg',
	 	x: 0.325,
	 	y: 0.5,
	 	active: false  
	 	},
	{
		name: 'bird',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/bird.jpeg',
	 	x: 0.5,
	 	y: 0.17,
	 	active: false  
	 	},
	{
		name: 'cricket',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/cricket.jpeg',
	 	x: 0.17,
	 	y: 0.83,
	 	active: false  
	 	},
	{
		name: 'wheat',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/wheat.jpeg',
	 	x: 0.625,
	 	y: 0.5,
	 	active: false  
	 	},
	{
		name: 'grass',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/grass.jpeg',
	 	x: 0.5,
	 	y: 0.83,
	 	active: false  
	 	},
	{
		name: 'carrot',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/carrot.jpeg',
	 	x: 0.83,
	 	y: 0.83,
	 	active: false  
	 	} 
];

var links = [
  {source: 0, target: 2, exitAdj: 'W', enterAdj: 'N', id: 0, active: true},
  {source: 2, target: 0, exitAdj: 'N', enterAdj: 'W', id: 1, active: true},
  {source: 0, target: 3, exitAdj: 'E', enterAdj: 'N', id: 2, active: true},
  {source: 3, target: 0, exitAdj: 'N', enterAdj: 'E', id: 3, active: true},
  {source: 2, target: 3, exitAdj: 'E', enterAdj: 'W', id: 4, active: true},
  {source: 3, target: 2, exitAdj: 'W', enterAdj: 'E', id: 5, active: true},
  {source: 1, target: 4, exitAdj: 'W', enterAdj: 'E', id: 6, active: true},
  {source: 4, target: 1, exitAdj: 'E', enterAdj: 'W', id: 7, active: true},
  {source: 6, target: 7, exitAdj: 'W', enterAdj: 'N', id: 8, active: true},
  {source: 7, target: 6, exitAdj: 'N', enterAdj: 'W', id: 9, active: true},
  {source: 6, target: 8, exitAdj: 'E', enterAdj: 'N', id: 10, active: true},
  {source: 8, target: 6, exitAdj: 'N', enterAdj: 'E', id: 11, active: true},
  {source: 7, target: 8, exitAdj: 'E', enterAdj: 'W', id: 12, active: true},
  {source: 8, target: 7, exitAdj: 'W', enterAdj: 'E', id: 13, active: true},
];

var dagLinks = [];


	


var target = this.div;
target.style.height = '100%';
target.style.width = '96%';
const pageWidth = target.offsetWidth;
const width = pageWidth * 0.75;
const xDivider = width * 0.25;
const height = width * 0.66;
const imgSize = height/6;
const linkImageSize = height/ links.length;
const linkWidth = xDivider/4;



function xAdjustment(heading) {
	if (heading == 'E') {
		return imgSize/2;
	}
	else if (heading == 'W') {
		return -imgSize/2;
	}
	return 0;
}

function yAdjustment(heading) {
	if (heading == 'S') {
		return imgSize/2;
	}
	else if (heading == 'N') {
		return -imgSize/2;
	}
	return 0;
}

var svg = d3.select(target)
			.append('svg')
			.attr('width',pageWidth)
			.attr('height', height);

	// define arrow markers for graph links
	svg.append('svg:defs').append('svg:marker')
    .attr('id', 'end-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 6)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
  	.append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#000');


var pairs =	svg.selectAll('g')
   		.data(links)
   		.enter()
   		.append('g')
   		.attr('class', 'pair')
   		.on('click', function(d,i) {
   			if (d.active == true) {
        		dagLinks.push(d);
      			d.active = false;
      			nodes[d.source].active = true;
      			nodes[d.target].active = true;
      			if (dagLinks.length == 14) {
					nodes[5].active = true;
				}
        		render();	
			}

   		});


  	pairs.append('image')
  		.attr('xlink:href', function(l) {
			var sourceNode = nodes.filter(function(d, i) {
       		return i == l.source;
     		})[0];
			return sourceNode.url;
		})
		.attr('x', linkWidth/2)
		.attr('y', function(d) {
			return d.id * linkImageSize;
		})
		.attr('width',linkImageSize - 5)
		.attr('height',linkImageSize - 5);

	pairs.append('image')
		.attr('xlink:href', function(l) {
			var targetNode = nodes.filter(function(d, i) {
       		return i == l.target;
     		})[0];
			return targetNode.url;
		})
		.attr('x', 2*linkWidth + linkWidth/2)
		.attr('y', function(d) {
			return d.id * linkImageSize;
		})
		.attr('width',linkImageSize - 5)
		.attr('height', linkImageSize - 5);


	pairs.append('line')
		.classed('link', true)
  		.attr('x1', 1.5 * linkWidth)
  		.attr('y1', function(d) {return (d.id + 1) * linkImageSize - linkImageSize/2;})
  		.attr('x2', 2.25 * linkWidth)
  		.attr('y2', function(d) {return (d.id + 1) * linkImageSize - linkImageSize/2;})
  		.attr("marker-end", "url(#end-arrow)");

const duration = 2000;

function render() {

	svg.selectAll('g.pair')
		.data(links)
		.filter(function(d) { return d.active == false; })
		.classed('inactive', true);


  	svg.selectAll('node_image')
    .data(nodes.filter(function(d){ return d.active == true; }))
  	.enter()
  	.append('image')
	.attr('xlink:href', function(d) {
		return d.url;
		})
	.attr('x', function(d) {
		return d.x * width - imgSize/2 + xDivider;
		} )
	.attr('y', function(d) {
		return d.y * height - imgSize/2;
		})
	.attr('width',imgSize)
	.attr('height',imgSize);

	svg.selectAll('link') 
	.data(dagLinks)
	.enter();

	svg.selectAll("link")
   .data(dagLinks)
   .enter()
   .append("path")
   .attr("class", "link")
   .attr("d", function(l) {
   	var sourceNode = nodes.filter(function(d, i) {
       return i == l.source;
     })[0];
    const targetNode = nodes.filter(function(d, i) {
       return i == l.target;
     })[0];
    const xStart = xDivider + sourceNode.x * width + xAdjustment(l.exitAdj);
    const yStart = sourceNode.y * height + yAdjustment(l.exitAdj);
    const xControlPt1 = xStart + xAdjustment(l.exitAdj);
    const yControlPt1 = yStart + yAdjustment(l.exitAdj);
    const xEnd = xDivider + targetNode.x * width + xAdjustment(l.enterAdj);
    const yEnd = targetNode.y * height + yAdjustment(l.enterAdj);
    const xControlPt2 = xEnd + xAdjustment(l.enterAdj);
    const yControlPt2 = yEnd + yAdjustment(l.enterAdj);
    return `M ${xStart}, ${yStart} C ${xControlPt1}, ${yControlPt1} 
    		${xControlPt2}, ${yControlPt2} 
    		${xEnd}, ${yEnd}`;
   	})
   .attr("marker-end", "url(#end-arrow)");

  svg.selectAll('link')
  .data(dagLinks)
  .exit()
  .remove();

}



```

This mathematical relation breaks our stuff into groups.  The birds are related to each other, the plants are all related to each other and the mammals are also grouped together.  The cricket is all alone and not related to anyone else.


# Relations You Already Know from Math Class

So now that you've seen we can use relations to organize our favorite stuff, let's talk about some relations that you already know.



# Guess the Relation

# :::: guess_the_relation

#### --partialborder problem1

**Problem 1.1** 

Let the following set of pairs be part of a larger infinite set of pairs that form a relation on the natural numbers.

$$
\begin{eqnarray}
(1,2)\,\,(1,3)\,\, (1,4)\,\, (1,5) \,\, (2,3) \\
(2,4)\,\, (2,5)\,\, (3,4)\,\, (3,5)\,\, (4,5)
\end{eqnarray}
$$

Which of the following pairs do you think belongs in this relation?

A) $(5,1)$
B) $(3,3)$
C) $(70,69)$
D) $(4,8)$

[Your Answer](:?answer) 

```javascript/autoplay
smartdown.setVariable('answer', '');
this.dependOn = ['answer'];
this.depend = function() {
	if (env.answer === 'D' || env.answer === 'd') {
		smartdown.toggleDisclosureButton('sol1');	
	}	
};
```

[Show Solution](::sol1)

# :::: sol1

# --outlinebox solution1
Solution:
This set of pairs forms the less than relation .
# --outlinebox

# ::::

#### --partialborder
# ::::

# Online Field Trip
# :::: feild_trip
real world examples
function - gdp -> happiness
feild trip to the [marvel universe](https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/04/marvel-cinematic-universe-whos-who-interactive/index.html) 

[vaccine game VAX](http://vax.herokuapp.com)
different relations - friend, romance, work, enemy, family
function - movie

# ::::

# More Exercises



[Partial Orders and Equivalence Relations](:@MoreRelations)
