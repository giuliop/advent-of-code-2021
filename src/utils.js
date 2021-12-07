import * as fs from 'fs';

export function fileToString(filename) {
	return fs.readFileSync(filename, { encoding: "utf-8" })
}

export function fileToArray(filename) {
	const input = fs.readFileSync(filename, { encoding: "utf-8" })
	const lines = input.split('\n');

	if (lines[lines.length - 1] === '')
		lines.pop();

	return lines;
}
