import { fileToArray } from './utils.js';

const filename = "input/day3";

const lines = fileToArray(filename)
	.map(x => x.split('').map(x => +x));

const COLS = lines[0].length;
const ROWS = lines.length;

function mostCommonBits(lines) {
	let res = Array(COLS).fill(0);

	for (let col = 0; col < COLS; col++) {
		for (let row = 0; row < ROWS; row++) {
			res[col] += lines[row][col];
		}
	}

	return res.map(n => n > (ROWS / 2) ? 1 : 0);
}

function inv(binArray) {
	return binArray.map(x => x ^ 1);
}

function binArrayToNum(binArray) {
	return binArray.reduce((x,y) => (x << 1) | y);
}

export function part1() {
	let gamma = mostCommonBits(lines);
	let epsilon = inv(gamma);

	return binArrayToNum(gamma) * binArrayToNum(epsilon);
}

function keepOnly(lines, validRows, col, isMost) {
	let bitSum = 0;
	for (let row of validRows) {
		bitSum += lines[row][col];
	}

	let bit = bitSum >= (validRows.length / 2) ? 1 : 0;
	if (! isMost)
		bit = bit ^ 1;

	return [...validRows].filter(n => lines[n][col] == bit);
}

export function part2() {
	let oxygen = [...Array(ROWS).keys()];
	let co2 = [...Array(ROWS).keys()];

	for (let i = 0; i < COLS; i++) {
		oxygen = keepOnly(lines, oxygen, i, true);
		if (oxygen.length == 1)
			break;
	}

	for (let i = 0; i < COLS; i++) {
		co2 = keepOnly(lines, co2, i, false);
		if (co2.length == 1)
			break;
	}

	return binArrayToNum(lines[oxygen[0]])
		* binArrayToNum(lines[co2[0]]);
}

