import { fileToArray } from './utils.js';

const filename = "input/day10";
const input = fileToArray(filename);

const openTag = ['(', '[', '{', '<'];
const scoresCorrupted = new Map(
	[[')', 3], [']', 57], ['}', 1197], ['>', 25137]]);
const scoresIncomplete = new Map([['(', 1], ['[', 2], ['{', 3], ['<', 4]]);
const match = new Map([[')', '('], [']', '['], ['}', '{'], ['>', '<']]);

class ParseResult {
	type;
	firstInvalid;
	opened;

	get isCorrupted() {
		return (this.type == "corrupted");
	}
	get isIncomplete() {
		return (this.type == "incomplete");
	}
	get isComplete() {
		return (this.type == "complete");
	}

	constructor(line) {
		let opened = [];

		for (let c of line) {

			if (openTag.includes(c)) {
				opened.push(c);
				continue;
			}

			let closes = match.get(c);
			if (closes && !(closes === opened.pop())) {
				this.type = "corrupted";
				this.firstInvalid = c;
				return;
			}
		}

		if (opened.length) {
			this.type = "incomplete";
		} else {
			this.type = "complete";
		}
		this.opened = opened;
	}
}

export function part1() {
	return input.reduce(
		function (sum, line) {
			let parsed = new ParseResult(line);
			return sum +
				(parsed.isCorrupted ? scoresCorrupted.get(parsed.firstInvalid) : 0);
		}, 0);
}

export function part2() {
	let scores =  input.map(line => new ParseResult(line))
		.filter(x => x.isIncomplete)
		.map(x => x.opened.reverse()
			.reduce((acc, tag) =>
				acc * 5 + scoresIncomplete.get(tag), 0))
			.sort((a,b) => a-b);

	return scores[Math.floor(scores.length / 2)];
}
