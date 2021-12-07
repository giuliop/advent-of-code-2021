import { fileToString } from './utils.js';

const filename = "input/day6";

const DAYS_1 = 80;
const DAYS_2 = 256;
const NEW_RESET = 8;
const OLD_RESET = 6;

function fishesAfterDays(days) {
	let input = fileToString(filename).split(',').map(Number);
	let fishes = new Map([[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0],
		[7,0], [8,0]]);

	input.reduce((fishes, n) => fishes.set(n, fishes.get(n) + 1), fishes);

	for (let day = 0; day < days; day++) {
		let newFishes = fishes.get(0);

		for (let fish = 1; fish <= NEW_RESET; fish++) {
			fishes.set(fish - 1, fishes.get(fish))
		}

		fishes.set(NEW_RESET, newFishes);
		fishes.set(OLD_RESET, fishes.get(OLD_RESET) + newFishes);

	}
	return [...fishes.values()].reduce((a,b) => a+b);
}

export function part1() {
	return fishesAfterDays(DAYS_1);
}

export function part2() {
	return fishesAfterDays(DAYS_2);
}
