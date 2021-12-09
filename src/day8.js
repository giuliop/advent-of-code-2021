import { fileToArray } from './utils.js';

const filename = "input/day8";

class Digit {
	constructor(str) {
		this.hash = Array.from(str).sort().join('');
		this.segments = new Set(str);
	}

	// digit will be the actual number it represent, e.g., 3
	digit;

	get length() {
		return this.segments.size;
	}

	includes(digit) {
		return [...digit.segments].every(s => this.segments.has(s));
	}
}

const input = fileToArray(filename).map(s => s.split(' | ')
	.map(s => s.split(' ').map(s => new Digit(s))));

let uniqueDigits = new Map([[2, 1], [4, 4], [3, 7], [7, 8]]);

export function part1() {
	return input
		.reduce((sum, [patterns, values]) =>
			sum + values.filter(x =>
				[...uniqueDigits.keys()].includes(x.length)).length
			, 0);
}

function digitsToNum(digits) {
	return parseInt(digits.reduce((numStr, digit) =>
		numStr + digit.digit, ""));
}

function getDigit(digits, digit) {
	return digits.find(d => d.digit == digit);
}

function solvePatterns([patterns, values]) {
	// first pass, identify 1, 4, 7, 8
	patterns.forEach(digit => {
		if (uniqueDigits.has(digit.length))
			digit.digit = uniqueDigits.get(digit.length);
	});
	// 3 has length 5 and "includes" 1
	let one = getDigit(patterns, 1);
	patterns.find(p => (! p.digit) && (p.length == 5) && p.includes(one))
		.digit = 3;
	// 6 has length 6 and does not "include" 1
	patterns.find(p => (! p.digit) && (p.length == 6) && (! p.includes(one)))
		.digit = 6;
	// 5 has length 5 and is "included" in 6
	let six = getDigit(patterns, 6);
	patterns.find(p => (! p.digit) && (p.length == 5) && six.includes(p))
		.digit = 5;
	// 2 is the last element of length 5
	patterns.find(p => (! p.digit) && (p.length == 5))
		.digit = 2;
	// 9 has length 6 and "includes" 3
	let three = getDigit(patterns, 3);
	patterns.find(p => (! p.digit) && (p.length == 6) && p.includes(three))
		.digit = 9;
	// 0 is the last element
	patterns.find(p => (! p.digit)).digit = 0;

	// now we assign the values' digit
	for (let v of values) {
		v.digit = patterns.find(p => p.hash == v.hash).digit;
	}
}

export function part2() {
	input.forEach((entry) => solvePatterns(entry))

	return input
		.reduce((sum, [patterns, values]) => sum + digitsToNum(values), 0);
}

