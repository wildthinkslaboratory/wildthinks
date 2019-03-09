
![fullwidth](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/7f5b396d56cbb06748ebcc6fda251d6a10260a0d/banner2.png)



# :::: video1

There will be a video eventually.  These are just notes on what will be in the video.

Imagine you have a bunch of stuff you want to understand.  It's not just random stuff (nothing really is) but it's hard to wrap your head around what's going on.  One strategy is to just pick up two pieces and ask the question how are these things the same?  How are they different?  Well let's say we decide to focus on just one aspect of these things. Maybe we pick some measure of size.  Which came first?  Well, this one did.  But now I want the big picture.  What's the story with all of these things?  By making lots of pairs and asking the same question I can make many pairwise answers.  Then putting all of these answers together, a picture starts to emerge.  For some pairs I may not have answers.  That's OK.  I can use all these little relationships to understand the big picture.  I can see a pattern start to emerge.

Organizing is a kind of math.  All this organizing, making lots of little comparisons is math.  Its one of the foundational ideas in mathematics.  It's called a relation. and we use them all the time to describr the relationships and patterns we see around us.  

# :::: 

# Relations
A relation is a foundational idea in mathematics. You use them all the time when you do math, but you may not be aware of them.  Functions, like $f(x) = x + 2$, are relations. Statements like $3 \geq 4$ or $4 \times 3 = 12$ are statements about relations.   Relations give us a way to describe the patterns and relationships we see in the world.  They might describe relationships between numbers or they might describe relationships between other stuff: people, websites, words, ideas, whatever stuff you care about.  

Relations are made from pairs.  So, what's a pair?  It's just two things put together, just as you'd expect. What things?  Anything you want. Lots of things come in pairs.

![fullwidth](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/6d038aa6b0d21ce503d4628a5dff3a292056030d/pairs.jpeg)

In math the order that we put things together in a pair matters.  Here's a more precise definition of a pair.

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

But numbers can be so dull. We can form pairs and cartesian products from anything we want.  Here's a set of things.

![fullwidth](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/71856e7d81be6577f9ec708902975a8025cb6ba2/functions1.002.jpeg)

Think about all the possible pairs we could make with these things.  There's a lot of them. There are $9$ ways we could pick the first element of a pair and $9$ ways we could pick the second element of the pair.  That's $9 \times 9 = 81$ different pairs we could make. Here's the full cartesian product of them with all $81$ pairs.

![fullwidth](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/1cbeba9f6aa2ac0c759106fa3e534e67c7ea2718/foodweb.jpeg) 



A **relation** is just a subset of those pairs. 
# --outlinebox def_binary_relation

**Definition 2** 
For sets $A$, $B$, any subset of the cartesian product $A \times B$ is called a **binary relation** from $A$ to $B$. Any subset of $A \times A$ is called a **binary relation** on $A$.

# --outlinebox



Here's a relation on our stuff that describes a relationship between the elements.  Take a few moments and see if you can figure out what that relationship is.  

![fullwidth](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/1cbeba9f6aa2ac0c759106fa3e534e67c7ea2718/foodwebcrossproduct.jpeg)

It can be hard to figure out what a relation describes by looking at ordered pairs.  We can replace every pair $(a,b)$ with an arrow $a \rightarrow b$ between $a$ and $b$.  It's the exact same set of pairs, but see if the relationship is clearer.

[Show relation with arrow notation](::food_web)
# :::: food_web

![fullwidth](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/71856e7d81be6577f9ec708902975a8025cb6ba2/functions1.004.jpeg)

This mathematical relation describes a food web between these plants and animals. The first element of any of these pairs will eat the second element of the pair.  The predators are on the top of the hierarchy and have only outgoing arrows. The plants are on the bottom and have only incoming arrows. 

Ok, here's a different relation on the same set of stuff.  What do you think this relation represents?

![fullwidth](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/71856e7d81be6577f9ec708902975a8025cb6ba2/functions1.005.jpeg)

[Show relation with arrow notation](::taxonomy)
# :::: taxonomy
![fullwidth](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/71856e7d81be6577f9ec708902975a8025cb6ba2/functions1.006.jpeg)

This mathematical relation breaks our stuff into groups.  The birds are related to each other, the plants are all related to each other and the mammals are also grouped together.  The cricket is all alone and does show up in any pairs.  
# ::::

# :::: 

What relationships do you see?


# Relations You Already Know from Math Class

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

# Field Trip Time
# :::: feild_trip
real world examples
function - gdp -> happiness
feild trip to the [marvel universe](https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/04/marvel-cinematic-universe-whos-who-interactive/index.html) 

[vaccine game VAX](http://vax.herokuapp.com)
different relations - friend, romance, work, enemy, family
function - movie

# ::::


