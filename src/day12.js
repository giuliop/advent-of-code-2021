import { fileToArray } from './utils.js';

const filename = "input/day12";

const maze = fileToArray(filename)
	.map(str => str.split('-'))
	.reduce(function (map, [from, to]) {
		let fromValue = map.has(from) ? map.get(from) : new Set();
		let toValue = map.has(to) ? map.get(to) : new Set();

		fromValue.add(to);
		toValue.add(from);

		map.set(from, fromValue);
		map.set(to, toValue);

		return map;
	}
	, new Map());

let part = 1;

function cloneMap(map) {
	let m = new Map(map);
	for (let k of m.keys()) {
		m.set(k, new Set(m.get(k)));
	}
	return m;
}

class Path {
	constructor(unexplored, pathSoFar) {
		this.unexplored = unexplored;
		this.path = pathSoFar;
		part == 1 ? this.updateStatusPart1() : this.updateStatusPart2();
	}

	updateStatusPart1() {
		let last = this.path.at(-1);
		if (last == last.toLowerCase()
			&& (this.path.indexOf(last) != (this.path.length - 1))) {
			this.status = "invalid";
		} else if (last == "end")
				this.status = "ended";
		else
			this.status = "open"
	}

	updateStatusPart2() {
		let last = this.path.at(-1);
		if ((last == 'start' && this.path.length > 1)
			||
			(last == last.toLowerCase()
				&& (this.path.filter(x => x ==last).length > 2))) {
			this.status = "invalid";
		} else if (last == "end")
				this.status = "ended";
		else
			this.status = "open"
	}

	newPathsfrom() {
		let newPaths = [];
		let from = this.path.at(-1);

		for (let to of this.unexplored.get(from)) {
			let unexplored = cloneMap(this.unexplored);
			let path = this.path.slice()

			unexplored.get(from).delete(to);
			path.push(to);
			newPaths.push(new Path(unexplored, path));
		}

		return newPaths;
	}
}

export function part1() {
	let pathsEnded = [];
	let frontier = [new Path(maze, ['start'])];

	while (frontier.length) {
		let next = frontier.pop();
		for (let path of next.newPathsfrom()) {
			//console.log(path);
			if (path.status == 'ended')
				pathsEnded.push(path);
			if (path.status == 'open') {
				frontier.push(path);
			}
		}
	}

	return pathsEnded.length;
}

export function part2() {
	part = 2;
	return part1();
}
