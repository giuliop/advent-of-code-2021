import { fileToArray } from './utils.js';

const filename = "input/day11";
const input = fileToArray(filename).map(x => x.split('').map(Number));

class World {
	world;
	totFlashes = 0;
	totalCells;

	constructor(input) {
		this.world = input;
		this.totalCells = input.length * input[0].length;
	}

	neighbors(row, col) {
		return [[row-1,col-1], [row-1, col], [row-1,col+1],
						[row,col-1], [row,col+1],
						[row+1,col-1], [row+1, col], [row+1,col+1]]
							.filter(([x,y]) => (x >=  0) && (y >= 0)
								&& (x < this.world.length) && (y < this.world[0].length))
	}

	increment() {
		this.world.forEach((xs, row) =>
			xs.forEach((x, col) => this.world[row][col]++));
	}

	flash() {
		let flashes = 0;
		let frontier = new Set();

		this.world.forEach((xs, row) =>
			xs.forEach((x, col) => {
				if (x > 9) {
					frontier.add([row, col]);
				}
			}));

		while (frontier.size) {
			let [x] = frontier;
			frontier.delete(x);
			let [row, col] = x;

			if (this.world[row][col] > 9) {
				flashes++;
				this.world[row][col] = 0;

				this.neighbors(row,col)
					.forEach(([row, col]) => {
						if (this.world[row][col] > 0) {
						this.world[row][col]++;
						frontier.add([row, col]);
						}
					});
			}
		}
		this.totFlashes += flashes;
		return flashes;
	}
}

export function part1() {
	let w = new World(input);
	for (let step = 0; step < 100; step++) {
		w.increment();
		w.flash();
	}
	return w.totFlashes;
}

export function part2() {
	let w = new World(input);

	for (let step = 1; ; step++) {
		w.increment();
		if (w.flash() == w.totalCells)
			return step;
	}
}
