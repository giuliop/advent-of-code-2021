import { fileToArray } from './utils.js';

const filename = "input/day15";
const input = fileToArray(filename).map(row => row.split('').map(Number));

function hash(p) {
	return String(p);
}

function dehash(p) {
	return [Number(p[0]), Number(p[2])];
}

class Maze {
	constructor(base, repeatN) {
		this.repeatN = repeatN;
		this.base = base;
		this.maxX = base[0].length * repeatN - 1;
		this.maxY = base.length * repeatN - 1;
	}

	risk([x,y]) {
		let baseX = this.base[0].length;
		let baseY = this.base.length;

		let wrapX = Math.floor(x / baseX);
		let wrapY = Math.floor(y / baseY);

		x %= this.base[0].length;
		y %= this.base.length;

		return ((((this.base[y][x] + wrapX) % 9 || 9) + wrapY) % 9 || 9);
	}

	get end() {
		return [this.maxX, this.maxY];
	}

}

class Path {
	constructor(pos, risk, path=[]) {
		this.pos = pos;
		this.risk = risk
		this.path = path.concat([pos]);
	}

	at(pos) {
		return hash(this.pos) == hash(pos);
	}

	newFrom(maze) {
		let paths = this.neighbors(maze).map(pos =>
			new Path(pos, this.risk + maze.risk(pos), this.path));
		return paths;
	}

	neighbors(maze) {
		let res = [];
		let [x,y] = this.pos;

		if (y > 0)					res.push([x, y-1]);
		if (y < maze.maxY)	res.push([x, y+1]);
		if (x > 0)					res.push([x-1, y]);
		if (x < maze.maxX)	res.push([x+1, y]);

		return res;
	}
}

// the Queue has three data structures:
// 1) (frontier) riskToPoss: a map of risk -> [hash(pos)]
// 2) visited: a map of hash(pos) -> Path

class Queue {
	constructor() {
		this.riskToPoss = new Map();
		this.visited = new Map();
	}

	add(newPath) {
		let pos = hash(newPath.pos);
		let newRisk = newPath.risk;
		let currRisk = this.visited.get(pos)?.risk;

		if (! currRisk || currRisk > newRisk) {
			this.visited.set(pos, newPath);

			let positions = this.riskToPoss.get(newRisk);
			if (positions)
				positions.push(pos)
			else
				this.riskToPoss.set(newRisk, [pos]);

			if (currRisk) {
				positions = this.riskToPoss.get(currRisk);
				let currIndex = positions.indexOf(pos);
				this.riskToPoss.set(currRisk, positions.splice(currIndex, 1));

				if (! positions.length)
					this.riskToPoss.delete(currRisk);
			}
		}
	}

	pop() {
		let minRisk = Math.min(...this.riskToPoss.keys());
		let pos = this.riskToPoss.get(minRisk).pop();

		let path =  this.visited.get(pos);

		if (! this.riskToPoss.get(minRisk).length)
			this.riskToPoss.delete(minRisk);

		return path;
	}
}

function findPath(maze) {
	let frontier = new Queue();
	let path = new Path([0,0], 0);
	let end = maze.end;

	frontier.add(path);

	while (true) {
		let path = frontier.pop();

		if (path.at(end))
			return path;

		for (let newPath of path.newFrom(maze))
			frontier.add(newPath);
	}
}

export function part1() {
	let maze = new Maze(input, 1);
	let path = findPath(maze);

	return path.risk;
}

export function part2() {
	let maze = new Maze(input, 5);
	let path = findPath(maze);

	return path.risk;
}
