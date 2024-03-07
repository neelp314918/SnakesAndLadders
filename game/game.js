import { createRandomNumber } from "./randomNumber.js";
import { ladder, snake } from "./createArtifacts.js";
import { movePlayer } from "./test.js";

let gameStatus = {
	currentPlayer: "player1",
	player1: {
		name: "player 1",
		position: 0,
		score: 0,
	},
	player2: {
		name: "player 2",
		position: 0,
		score: 0,
	},
	isThereaWinner: false,
};

let button = document.getElementById("rollButton");

button.addEventListener("click", function () {
	if (!gameStatus.isThereaWinner) {
		let diceNumber = createRandomNumber(6, 1);
		let celllsWithLadder = Object.keys(ladder);
		let celllsWithSnake = Object.keys(snake);
		let playerMovesto = (
			gameStatus[gameStatus.currentPlayer].position + diceNumber
		).toString();

		// ***************************************************** LOGS TO VALIDATE
		console.log(
			"---------------------------------------------------------------------------"
		);
		console.log(`${gameStatus.currentPlayer} rolls a`, diceNumber);
		console.log(
			`${gameStatus.currentPlayer} current position is ${
				gameStatus[gameStatus.currentPlayer].position
			}`
		);
		console.log(`${gameStatus.currentPlayer} will move to:`, playerMovesto);
		console.log(
			"Landed on ladder?",
			celllsWithLadder.includes(playerMovesto)
		);
		console.log("Cells with ladders", celllsWithLadder);
		console.log(
			"Landed on Snake?",
			celllsWithSnake.includes(playerMovesto)
		);
		console.log("Cells with snakes", celllsWithSnake);

		// ***************************************************** LOGS TO VALIDATE

		if (celllsWithLadder.includes(playerMovesto)) {
			movePlayer(gameStatus, Number(playerMovesto));
			console.log("landed on ladder");
			gameStatus[gameStatus.currentPlayer].position =
				ladder[playerMovesto];
		} else if (celllsWithSnake.includes(playerMovesto)) {
			movePlayer(gameStatus, Number(playerMovesto));
			console.log("landed on snake");
			gameStatus[gameStatus.currentPlayer].position =
				snake[playerMovesto];
		} else {
			if (Number(playerMovesto) < 49) {
				movePlayer(gameStatus, Number(playerMovesto));
				gameStatus[gameStatus.currentPlayer].position += diceNumber;
				console.log(
					"player move to cell:",
					gameStatus[gameStatus.currentPlayer].position
				);
			}
			if (Number(playerMovesto) === 49) {
				console.log(`${gameStatus.currentPlayer} WON`);
				gameStatus.isThereaWinner = true;
			}
		}
		// Add to score
		gameStatus[gameStatus.currentPlayer].score += diceNumber;
		console.log("player", gameStatus[gameStatus.currentPlayer]);

		// --------------------------------------------------------------------------------

		gameStatus.currentPlayer =
			gameStatus.currentPlayer === "player1" ? "player2" : "player1";
	}
});
