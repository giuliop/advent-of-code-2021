import { readFileSync } from 'fs';

const filename = "input/day4";

function readInput() {
	const input = readFileSync(filename, { encoding: "utf-8" })

	let firstNewline = input.indexOf('\n');

	let numbers =	input.slice(0, firstNewline)
		.split(',')
		.map(x => Number(x));

	let boards = input.slice(firstNewline + 2)
		.split('\n\n')
		.map(function(board) {
			let nums = new Array();
			for (var i = 0; i + 1 < board.length; i += 3) {
				nums.push(Number(board.slice(i, i + 3)));
			}
			return nums;
		});

	return [numbers, boards];
}

function rowOf(pos) {
	return Math.floor(pos / 5);
}

function colOf(pos) {
	return pos % 5;
}

class ScoreCard {
	rowHits = [0,0,0,0,0];
	colHits = [0,0,0,0,0];
	hasWon = false;

	constructor(board) {
		this.board = board;
	}

	mark(num) {
		let pos = this.board.indexOf(num);
		if (pos == -1) return;
		let [row, col] = [rowOf(pos), colOf(pos)];
		this.rowHits[row]++;
		this.colHits[col]++;
	}

	won() {
		return Math.max(
			Math.max(...this.rowHits),
			Math.max(...this.colHits))
			== 5;
	}

	score(numbers, idx) {
		let unmarkedSum = this.board
			.filter(function(n) {
				for (let i = 0; i <= idx; i++) {
					if (numbers[i] == n)
						return false;
				}
				return true;
			})
			.reduce((a,b) => a + b, 0);

		return numbers[idx] * unmarkedSum;
	}
}

export function part1() {
	let [numbers, boards] = readInput();
	let scoreCards = boards.map(board => new ScoreCard(board));

	for (let i = 0; i < numbers.length; i++) {
		scoreCards.forEach(card => card.mark(numbers[i]));

		for (let card of scoreCards) {
			if (card.won())
				return card.score(numbers, i);
		}
	}
}

export function part2() {
	let [numbers, boards] = readInput();
	let scoreCards = boards.map(board => new ScoreCard(board));
	let winner;

	for (let i = 0; i < numbers.length; i++) {

		scoreCards.forEach(card => card.mark(numbers[i]));

		for (let card of scoreCards) {
			if (card.won())
				card.hasWon = true;
		}

		scoreCards = scoreCards.filter(card => !card.hasWon);

		if (scoreCards.length == 1)
			winner = scoreCards[0];

		if (!scoreCards.length)
			return winner.score(numbers, i);
	}
}
