class Graph {
	constructor() {
		this.adjacencyList = {};
	}

	addVertex(vertex) {
		// check if the vertext already exists, if so do nothing and return false
		if (this.adjacencyList[vertex]) return false;
		// add the vertext to the list object, it value is an empty array
		this.adjacencyList[vertex] = [];
		// return true to indicate success
		return true;
	}

	addEdge(vertex1, vertex2) {
		// check if both verteces exists. If one doesn't exist, do nothing and return false
		if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
			return false;
		}
		// if both verteces exist, push the opposite vertex into the vertex edge array
		this.adjacencyList[vertex1].push(vertex2);
		this.adjacencyList[vertex2].push(vertex1);
		return true;
	}

	removeEdge(vertex1, vertex2) {
		// check if both verteces exists. If one doesn't exist, do nothing and return false
		if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
			return false;
		}
		// filter out the opposite vertex from both verteces
		this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
			(edge) => edge !== vertex2
		);
		this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
			(edge) => edge !== vertex1
		);
		return true;
	}

	removeVertex(vertex) {
		// if the vertex does not exist do nothing and return false
		if (!this.adjacencyList[vertex]) return false;
		// loop through the vertex to be removed edges array and remove the vertex from all other verteces adjecencies
		while (this.adjacencyList[vertex.length] > 0) {
			let edge = this.adjacencyList[vertex].pop();
			this.removeEdge(vertex, edge);
		}
		// then remove to vertex from the list
		delete this.adjacencyList[vertex];
		// return true to indicate success
		return true;
	}

	// depth first traversal will traverse the entire graph, recording all the paths available to through the graph from a given origin node
	depthFirstTravRec(originVertex) {
		// if the supplied origin does not exist, return null
		if (!this.adjacencyList[originVertex]) return null;
		// define variables for visited nodes and paths
		let visitedNodes = {};
		let paths = [];
		// the definition of this changes when you have an inner function(from the Graph to the function that contains the inner function) so we place the graph's this.adjacencyList into a variable for ease of access.(Alternatively the dftHelper function could be added to the Graph as a private method).
		const adjacencyList = this.adjacencyList;
		// define the recursive helper function that accepts a vertex
		const dftHelper = (vertex) => {
			// base case, if the vertex has no nodes in it's adjacency list
			if (adjacencyList[vertex].length === 0) return null;
			// place the current vertex in the visited nodes
			visitedNodes[vertex] = true;
			// push the current vertex onto the paths list
			paths.push(vertex);
			// loop over the adjacency list of each node
			adjacencyList[vertex].forEach((neighbor) => {
				// if any nodes in the adjacency list have NOT been visited, call this helper on the unvisited vertex
				if (!visitedNodes[neighbor]) {
					return dftHelper(neighbor);
				}
			});
		};
		dftHelper(originVertex);
		// after the helper exits, return the paths list
		return paths;
	}

	// iterative solution to depth first traversal
	depthFirstTravIter(originVertex) {
		// create variables, stack to track vertices to be visited, list for the paths through the graph, object to keep track of visited verteces
		let toBeVisited = [originVertex];
		let visited = {};
		let paths = [];
		visited[originVertex] = true;
		// while the stack has at least one vertex
		while (toBeVisited.length > 0) {
			// pop off the last vertex added to the to be visited list
			let currentVertex = toBeVisited.pop();
			// push the current vertex onto the paths list
			paths.push(currentVertex);
			// for each neighbor of the current vertex
			this.adjacencyList[currentVertex].forEach((neighbor) => {
				// if the neighbor has not been visited yet, visit it
				if (!visited[neighbor]) {
					// set the neighbor vertex as visited
					visited[neighbor] = true;
					// push the neighbor vertex onto the list to be visited
					toBeVisited.push(neighbor);
				}
			});
		}
		// return the paths once the while loop exits
		return paths;
	}

	breadthFirstTrav(originVertex) {
		// create variables
		// a queue of verteces to be visited with the origin vertex added
		let toBeVisited = [originVertex];
		// a list of the verteces the origin can reach
		let paths = [];
		// an object to store the verteces that have been visited
		let visited = {};
		// add the origin vertex to the visited object
		visited[originVertex] = true;
		// while there are verteces to be visited
		while (toBeVisited.length > 0) {
			// remove the first vertex from the to be visited queue
			let currentVertex = toBeVisited.shift();
            // push the current vertex to the paths list
            paths.push(currentVertex);
			// for each neighbor of the current vertex
			this.adjacencyList[currentVertex].forEach((neighbor) => {
				// if the neighbor has not been visited
				if (!visited[neighbor]) {
					// mark the neighbor as visited
					visited[neighbor] = true;
					// enqueue the neighbor into the to be visited queue
					toBeVisited.push(neighbor);
				}
			});
		}
		// return the list of verteces the origin can reach
        return paths;
	}
}

let graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');
graph.addEdge('D', 'E');
graph.addEdge('D', 'F');
graph.addEdge('E', 'F');
console.log(graph);
console.log(graph.depthFirstTravRec('A'));
console.log(graph.depthFirstTravIter('A'));
console.log(graph.breadthFirstTrav('A'));
