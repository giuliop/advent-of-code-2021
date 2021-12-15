import { fileToString } from './utils.js';

const filename = "input/day14";
const input = fileToString(filename);

class naivePolymer {
	constructor(str) {
		this.poly = str;
	}

	applyRules(rules) {
		let newPoly = "";
		let poly = this.poly;

		for (let i = 0; i < poly.length - 1; i++) {
			let base = poly.substring(i, i + 2);
			let sub = poly[i] + (rules.get(base) ?? '');
			newPoly += sub;
		}

		this.poly =  newPoly + poly.at(-1);
	}

	elementCount() {
		let count = new Map();
		for (let c of this.poly)
			count.set(c, (count.get(c) ?? 0) + 1);
		return count;
	}
}

export function part1() {
	let [polymer, rules] = input.split("\n\n");
	polymer = new naivePolymer(polymer);
	rules = new Map(rules.split('\n').filter(x => x.length).map(s => s.split(" -> ")));

	for (let i = 0; i < 10; i++) {
		polymer.applyRules(rules);
	}

	let count = polymer.elementCount();

	return Math.max(...count.values()) - Math.min(...count.values());
}

class smartPolymer {
	constructor(str) {
		let poly = new Map();

		for (let i = 0; i < str.length - 1; i++) {
			let base = str.substring(i, i + 2);
			poly.set(base, (poly.get(base) ?? 0) + 1);
		}

		this.poly = poly;
		this.template = str;
	}

	applyRules(rules) {
		let newPoly = new Map();
		let poly = this.poly;

		for (let base of poly.keys()) {
			let n = poly.get(base);
			let sub1 = base[0] + rules.get(base);
			let sub2 = rules.get(base) + base[1];
			newPoly.set(sub1, (newPoly.get(sub1) ?? 0) + n);
			newPoly.set(sub2, (newPoly.get(sub2) ?? 0) + n);
		}

		this.poly =  newPoly;
	}

	elementCount() {
		let count = new Map();
		for (let [[c1,c2], n] of this.poly) {
			count.set(c1, (count.get(c1) ?? 0) + n);
		}

		let lastChar = this.template.at(-1);
		count.set(lastChar, (count.get(lastChar) ?? 0) + 1);

		return count;
	}
}

export function part2() {
	let [polymer, rules] = input.split("\n\n");
	polymer = new smartPolymer(polymer);
	rules = new Map(rules.split('\n').filter(x => x.length).map(s => s.split(" -> ")));

	//console.log(polymer.poly);
	for (let i = 0; i < 40; i++) {
		polymer.applyRules(rules);
		//console.log(polymer.poly);
	}

	let count = polymer.elementCount();

	return Math.max(...count.values()) - Math.min(...count.values());
}
