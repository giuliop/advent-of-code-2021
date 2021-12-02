const module = "./src/" + process.argv[2] + ".js";
const part = process.argv[3];

const { part1, part2 } = await import(module);

switch (part) {
	case "1":
		console.log(part1());
		break;
	case "2":
		console.log(part2());
		break;
	default:
		throw "Error - unknown part: " + part;
}
