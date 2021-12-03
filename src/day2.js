import { fileToArray } from './utils.js';

const filename = "input/day2";

let depth = 0;
let pos = 0;
let aim = 0;

function action_part1([move, steps]) {
	switch (move) {
		case 'forward':
			pos += +steps;
			break;
		case 'down':
			depth += +steps;
			break;
		case 'up':
			depth -= +steps;
			break;
		default:
			throw "Unknown move: " + move;
	}
	//console.log(move, steps, pos, depth);
}

export function part1() {
	fileToArray(filename)
		.map(x => x.split(' '))
		.forEach(x => action_part1(x));

	return depth * pos;
}

function action_part2([move, steps]) {
	switch (move) {
		case 'forward':
			pos += +steps;
			depth += +steps * aim;
			break;
		case 'down':
			aim += +steps;
			break;
		case 'up':
			aim -= +steps;
			break;
		default:
			throw "Unknown move: " + move;
	}
	//console.log(move, steps, pos, depth);
}

export function part2() {
	fileToArray(filename)
		.map(x => x.split(' '))
		.forEach(x => action_part2(x));

	return depth * pos;
}
