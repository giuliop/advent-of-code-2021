import { fileToArray } from './utils.js';

const filename = "input/day12";

const maze = fileToArray(filename)
	.map(str => str.split('-'))
	.reduce(function (map, [from, to]) {
		let fromValue = map.has(from) ? map.get(from) : [];
		let toValue = map.has(to) ? map.get(to) : [];

		fromValue.push(to);
		toValue.push(from);

		map.set(from, fromValue);
		map.set(to, toValue);

		return map;
	}
	, new Map());

let part = 1;

class Path {
	constructor(maze, from, smallVisited) {
		this.maze = maze;
		this.last = from;
		this.smallVisited = smallVisited;
		part == 1 ? this.updateStatusPart1() : this.updateStatusPart2();
	}

	updateStatusPart1() {
		this.status = "open"

		if (this.last == "end") {
				this.status = "ended";

		}	else if (this.last == this.last.toLowerCase()) {
			this.smallVisited.set(this.last,
				1 + (this.smallVisited.get(this.last) ?? 0));

			if ([...this.smallVisited.values()].filter(x => x > 1).length > 0)
				this.status = "invalid";
		}
	}

	updateStatusPart2() {
		this.status = "open"

		if (this.last == "end")
			this.status = "ended";

		if (this.last == this.last.toLowerCase()) {
			this.smallVisited.set(this.last,
				1 + (this.smallVisited.get(this.last) ?? 0));

			if ((this.smallVisited.get(this.last) > 2) ||
				([...this.smallVisited.values()].filter(x => x > 1).length > 1))
				this.status = "invalid";
		}

		if ((this.smallVisited.get('start') > 1)
				|| (this.smallVisited.get('end') > 1))
			this.status = "invalid";
	}

	newPathsfrom() {
		let newPaths = [];

		for (let to of this.maze.get(this.last)) {
			newPaths.push(new Path(maze, to, new Map(this.smallVisited)));
		}

		return newPaths;
	}
}

export function part1() {
	let pathsEnded = 0;
	let frontier = [new Path(maze, "start", new Map())];

	while (frontier.length) {
		let next = frontier.pop();
		for (let path of next.newPathsfrom()) {
			if (path.status == 'ended')
				pathsEnded++;
			if (path.status == 'open') {
				frontier.push(path);
			}
		}
	}

	return pathsEnded;
}

export function part2() {
	part = 2;

	//let p = part1();
	//console.log(p.map(x=>x.path));
	//return p.length;

	return part1();
}
