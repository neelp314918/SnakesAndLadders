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
let player1Score = document.getElementById("player1-score");
let player2Score = document.getElementById("player2-score");
let turn = document.getElementById("turns");
turn.textContent = gameStatus.currentPlayer;
button.addEventListener("click", function () {
	button.disabled = true;
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
				movePlayer(gameStatus, Number(playerMovesto));
				gameStatus[gameStatus.currentPlayer].position += diceNumber;
				console.log(
					"player move to cell:",
					gameStatus[gameStatus.currentPlayer].position
				);
				console.log(`${gameStatus.currentPlayer} WON`);
				gameStatus.isThereaWinner = true;
				turn.textContent = "";
				button.textContent = "Restart Game";
			}
			if (Number(playerMovesto) > 49) {
				button.disabled = false;
			}
		}
		// Add to score
		gameStatus[gameStatus.currentPlayer].score += diceNumber;
		console.log("player", gameStatus[gameStatus.currentPlayer]);

		// --------------------------------------------------------------------------------
		console.log(
			`${gameStatus.currentPlayer} current SCORE is ${
				gameStatus[gameStatus.currentPlayer].score
			}`
		);
		if (gameStatus.currentPlayer === "player1") {
			player1Score.textContent =
				gameStatus[gameStatus.currentPlayer].score;
		} else {
			player2Score.textContent =
				gameStatus[gameStatus.currentPlayer].score;
		}

		gameStatus.currentPlayer =
			gameStatus.currentPlayer === "player1" ? "player2" : "player1";

		// turn.textContent = gameStatus.currentPlayer;
	} else {
		location.reload();
	}
});

export { button, turn, gameStatus };
