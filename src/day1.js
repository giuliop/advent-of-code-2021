import { fileToArray } from './utils.js';

const filename = "input/day1";
const lines = fileToArray(filename)

function countIncreases(nums) {
	let res = 0;
	for (let i = 1; i < nums.length; i++) {
		if (+nums[i] > +nums[i-1])
			res++;
	}
	return res;
}

export function part1() {
	return countIncreases(lines);
}

export function part2() {
	let triplets = Array(lines.length - 2);
	for (let i = 0; i < triplets.length; i++) {
		triplets[i] = +lines[i] + +lines[i+1] + +lines[i+2];
	}
	return countIncreases(triplets);
}
