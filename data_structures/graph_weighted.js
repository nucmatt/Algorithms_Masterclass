// a weighted graph is system is created to demonstrate Dijkstra's Algorithm
// Dijkstra's algorithm uses a priority queue to help determine the shortest path between two verteces so a simple priority queue is created
class PriorityQueue {
	constructor() {
		// the priority queue only hold a list of values that are assigned a priority
		this.values = [];
	}

	// enqueue will add a value to the queue. The value and it's priority must be passed to the method
	enqueue(val, priority) {
		this.values.push({ val, priority });
		// once a new value is placed in the queue, the queue must be resorted to determine the necessary order
		this.sort();
	}

	// dequeue will simply remove the highest priority value from the queue
	dequeue() {
		return this.values.shift();
	}

	// sort is a helper method to sort the queue by priority as values are added
	sort() {
		this.values.sort((a, b) => a.priority - b.priority);
	}
}

class WeightedGraph {
	constructor() {
		this.adjacencyList = {};
	}

	addVertex(vertex) {
		if (this.adjacencyList[vertex]) return false;

		this.adjacencyList[vertex] = [];
		return true;
	}

	// for a weighted graph a weight must be added to an edge between verteces so addEdge must accept a third parameter, weight
	addEdge(vertex1, vertex2, weight) {
		if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
			return false;
		}

		this.adjacencyList[vertex1].push({ node: vertex2, weight: weight });

		this.adjacencyList[vertex2].push({ node: vertex1, weight: weight });

		return true;
	}

    // Dijkstra's algorithm is used to determine the lowest weighted path between two given verteces
    shortestPath(start, end) {
        // create variables
            // an object that will hold distances from the starting vertex to all other verteces within the graph
        let distances = {};
            // a priority queue to prioritize each vertex in the graph by it's distance from the starting vertex
        let queue = new PriorityQueue();
            // an object to hold each vertex's shortest path from it's parent verteces
        let previous = {};
        // a list that contains the verteces of the shortest path from the starting vertex to the ending vertex
        let path = [];
        // a variable to hold the current vertex being examined by the algorithm
        let currentVertex;

        // Set up the initial state
        for (let vertex in this.adjacencyList) {
            // the starting vertex will always have a distance of 0 and the highest priority(0);
            if(vertex === start) {
                distances[vertex] = 0;
                queue.enqueue(vertex, 0)
            } else {
                // Add all verteces as keysto the distances object and the previous object. Distances start at infinity. 
                distances[vertex] = Infinity;
            }
            // add each vertex to the previous object with a value of null
            previous[vertex] = null;
        }
        // loop through the priority queue until it is empty
        while(queue.values.length > 0) {
            // dequeue a vertex from the queue and store it as the current vertex
            let currentVertex = queue.dequeue().val;
            // if the currentVertex vertex is the ending vertex, return the path from through the graph from start to end
            if(currentVertex === end) {
                // first push the currentVertex(end) node to the path list
                path.push(currentVertex);
                // then push each previous node onto the path until you reach the start node(distance of null)
                while(previous[currentVertex] !== null) {
                    path.push(previous[currentVertex]);
                    currentVertex = previous[currentVertex];
                }
                return path.reverse();
            }
            // else loop through each neighbor in the adjacency list for the currentVertex vertex
            this.adjacencyList[currentVertex].forEach(neighbor =>  {
                // calculate the weight from this neighbor vertex to the starting vertex by adding the currentVertex nodes distance and the neighbor's weight.
                let distanceTotal = distances[currentVertex] + neighbor.weight;
                // if the calculated distance is less than the currently stored distance of the neighbor to the start(stored in distances)
                if (distanceTotal < distances[neighbor.node]) {
                    // update the neighbor's distance from the starting vertex with the new lower distance
                    distances[neighbor.node] = distanceTotal;
                    // update the previous vertex of the current to be the neighbor vertex (the neighbor is now the closest vertex to the current vertex)
                    previous[neighbor.node] = currentVertex;
                    // enqueue this neighbor vertex with it's priority set to the total distance from the starting vertex
                    queue.enqueue(neighbor.node, distanceTotal);
                }
            })
        }
    }
}

let graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A","B",4);
graph.addEdge("A","C",2);
graph.addEdge("B","E",3);
graph.addEdge("C","D",2);
graph.addEdge("C","F",4);
graph.addEdge("D","E",3);
graph.addEdge("D","F",1);
graph.addEdge("E","F",1);

console.log(graph.shortestPath("A","E"));
