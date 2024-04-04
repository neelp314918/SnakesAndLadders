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
let winnerPanel = document.getElementById("winner");
let turn = document.getElementById("turns");
let dicePanel = document.getElementById("dice");
let selector1 = document.getElementById("p1-selector");
let selector2 = document.getElementById("p2-selector");
turn.textContent = gameStatus.currentPlayer;

button.addEventListener("click", function () {
	button.disabled = true;
	if (!gameStatus.isThereaWinner) {
		if (gameStatus.currentPlayer === "player1") {
			selector1.textContent = "->";
			selector2.textContent = "                ";
		} else {
			selector2.textContent = "->";
			selector1.textContent = "";
		}

		let diceNumber = createRandomNumber(6, 1);
		dicePanel.src = "./assets/images/dice" + diceNumber + ".png";
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
			//IF PLAYER WINS THE GAME
			if (Number(playerMovesto) === 49) {
				movePlayer(gameStatus, Number(playerMovesto));
				gameStatus[gameStatus.currentPlayer].position += diceNumber;
				console.log(
					"player move to cell:",
					gameStatus[gameStatus.currentPlayer].position
				);
				console.log(`${gameStatus.currentPlayer} WON`);
				gameStatus.isThereaWinner = true;
				turn.textContent = gameStatus.currentPlayer;
				button.textContent = "Restart Game";
				dicePanel.classList.add("hide");
				winnerPanel.classList.add("show");
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
		let name = prompt(
			`Congratulation ${gameStatus.currentPlayer} please enter your name to save your score`
		);

		const url =
			"https://code.schoolofdesign.ca/api/endpoint/miguelandres.murillorozo@georgebrown.ca/snakesandladders/scores";
		const data = new URLSearchParams();
		data.append("name", name);
		data.append("score", gameStatus[gameStatus.currentPlayer].score);

		fetch(url, {
			method: "POST",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: data,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				console.log("Success:", data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});

		winnerPanel.classList.remove("show");
		location.reload();
	}
});

export { button, turn, gameStatus };
