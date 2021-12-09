import { fileToArray, arraySum } from './utils.js';

const filename = "input/day9";
const input = fileToArray(filename).map(str => str.split('').map(Number));

function isLowest(n, row, col, input) {
	return neighbors(row, col, input)
		.every(([row, col]) => input[row][col] > n);
}

function neighbors(row, col, input) {
	let res = [];

	if (row > 0)										res.push([row-1, col]);
	if (row < input.length - 1)			res.push([row+1, col]);
	if (col > 0)										res.push([row, col-1]);
	if (col < input[0].length - 1)  res.push([row, col+1]);

	return res;
}

export function part1() {
	return arraySum(input.map((nums, row) =>
		arraySum(nums.filter((num, col) => isLowest(num, row, col, input))
			.map(x => x + 1))));
}

function hash(row, col) {
	return "" + row + "," +  col;
}

function dehash(hash) {
	return hash.split(',').map(Number);
}

export function part2() {
	let basins = [];
	let visited = new Set();

	input.forEach(function (nums, row) {
		nums.forEach(function (num, col) {

			if ( ! visited.has(hash(row, col)) && (num != 9) ) {

				let frontier = new Set([hash(row, col)]);
				let currBasin = 0;

				let basin = [];

				while (frontier.size) {
					let [rowColHash] = frontier;
					frontier.delete(rowColHash);

					visited.add(rowColHash);
					let [row, col] = dehash(rowColHash);
					currBasin++;

					neighbors(row, col, input)
						.filter(([row, col]) =>
							! visited.has(hash(row, col)) && (input[row][col] != 9))
							.forEach(([row, col]) => frontier.add(hash(row, col)));
				}

				basins.push(currBasin);
			}
		});
	});

	return basins.sort((a, b) => a - b).slice(-3).reduce((a,b) => a*b);
}
