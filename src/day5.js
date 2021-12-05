import { fileToArray } from './utils.js';

const filename = "input/day5";
const input = fileToArray(filename);

class Point {
	constructor(str) {
		[this.x, this.y] = str.split(',').map(Number);
	}

	get hash() {
		return this.x + "," + this.y;
	}

	clone() {
		return new Point(this.hash);
	}
}

class Segment {
	constructor(str) {
		let [start, end] = str.split(" -> ");
		this.start = new Point(start);
		this.end = new Point(end);
	}

	isStraight() {
		return (this.start.x == this.end.x) || (this.start.y == this.end.y);
	}

	points() {
		let xStep = this.start.x < this.end.x ? 1 : -1;
		let yStep = this.start.y < this.end.y ? 1 : -1;

		let point = this.start.clone();
		let res = [point.hash];

		while (point.hash != this.end.hash) {

			if (point.x != this.end.x)
				point.x += xStep;

			if (point.y != this.end.y)
				point.y += yStep

			res.push(point.hash);
		}

		return res;
	}
}

function mark(map, point) {
	map.set(point, (map.get(point) || 0 ) + 1);
}

function countOverlaps(segments) {
	let map = new Map();
	segments.forEach(s => s.points().forEach(p => mark(map, p)));

	return [...map.values()].filter(v => v > 1).length;
}

export function part1() {
	let straightSegments =
		input
		.map(line => new Segment(line))
		.filter(segment => segment.isStraight());

	return countOverlaps(straightSegments);
}

export function part2() {
	let segments = input.map(line => new Segment(line));

	return countOverlaps(segments);
}
