import { fileToString } from './utils.js';

const filename = "input/day13";
const input = fileToString(filename);

function folds(input) {
	return input
		.split("\n\n")[1]
		.split('\n')
		.filter(str => str.length)
		.map(str => str.split(' ')[2].split('='));
}

class Paper {
	constructor(input) {
		this._dots = input.split("\n\n")[0]
			.split('\n')
			.map(str => str.split(',').map(Number));
	}

	fold([axis, n]) {
		axis = (axis == 'x' ? 0 : 1);
		for (let dot of this._dots) {
			if (dot[axis] > n) {
				dot[axis] = n - (dot[axis] - n);
			}
		}
	}

	get dots() {
		return new Set(this._dots.map(d => String(d)));
	}

	print() {
		let maxX = Math.max(...this._dots.map(([x, y]) => x));
		let maxY = Math.max(...this._dots.map(([x, y]) => y));
		let dots = this.dots;

		for (let y = 0; y <= maxY; y++) {
			for (let x = 0; x <= maxX; x++) {
				if (dots.has(String(x) + ',' + String(y)))
					process.stdout.write('#');
				else
					process.stdout.write(' ');
			}
			console.log();
		}
	}
}

export function part1() {
	let p = new Paper(input);
	let f = folds(input);

	p.fold(f[0]);

	return p.dots.size;
}

export function part2() {
	let p = new Paper(input);
	let f = folds(input);

	f.forEach(x => p.fold(x));

	p.print();

	return "\nRead the eight capital letters above :)";
}
