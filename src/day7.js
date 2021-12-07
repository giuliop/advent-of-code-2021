import { fileToString, arraySum } from './utils.js';

const filename = "input/day7";

//const input = "16,1,2,0,4,2,7,1,2,14";
const input = fileToString(filename);
const positions = input.split(',').map(Number).sort((a,b) => a-b);

export function part1() {
	const median = positions[Math.floor(positions.length / 2)];

	return positions.map(x => x > median ? x - median : median - x)
		.reduce((a,b) => a+b);
}

export function part2() {
	const sum = arraySum(positions);
	let avg = sum / positions.length;

	if (sum % positions.length != 0) {
		let greaterThanAvg = positions
			.reduce((acc, x) => x > avg ? acc + 1 : acc, 0);

		avg = greaterThanAvg > positions.length / 2 ? Math.ceil(avg)
			: Math.floor(avg);
	}

	return positions.map(function(x) {
		let n = x > avg ? x - avg : avg - x;
		return n * (n + 1) / 2;
	}).reduce((a,b) => a+b);
}
