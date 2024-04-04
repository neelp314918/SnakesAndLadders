import { createRandomNumber } from "./randomNumber.js";

let cellsUsed = [];
let ladder = {
	name: "ladder",
};
let snake = {
	name: "snake",
};

function createPair() {
	let value1, value2;

	do {
		value1 = createRandomNumber(48, 2);
		value2 = createRandomNumber(48, 2);
	} while (
		Math.abs(value1 - value2) < 11 ||
		value1 === value2 ||
		cellsUsed.includes(value1) ||
		cellsUsed.includes(value2)
	);

	cellsUsed.push(value1);
	cellsUsed.push(value2);
	return [value1, value2];
}
// function createRandomNumber(max, min) {
// 	return Math.floor(Math.random() * (max - min + 1)) + min;
// }

function createSnakeOrLadder(gameArtifact) {
	for (let i = 0; i < 3; i++) {
		let pair = createPair();
		if (gameArtifact.name === "snake") {
			pair.sort(function (a, b) {
				return b - a;
			});
		} else if (gameArtifact.name === "ladder") {
			pair.sort(function (a, b) {
				return a - b;
			});
		}
		gameArtifact[pair[0]] = pair[1];
	}
}

createSnakeOrLadder(ladder);
createSnakeOrLadder(snake);

//LOGS-----------------------------------------
// console.log("Ladder created", ladder);
// console.log("Snake created", snake);
// console.log(
// 	"cellsUsed",
// 	cellsUsed.sort(function (a, b) {
// 		return a - b;
// 	})
// );
//LOGS-----------------------------------------
export { ladder };
export { snake };

/* sort(function(a, b){return a - b} */
