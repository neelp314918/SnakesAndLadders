import { ladder, snake } from "./createArtifacts.js";
import { createRandomNumber } from "./randomNumber.js";
import { button, turn, gameStatus } from "./game.js";

// get canvas position
const canvasPosition = document
	.getElementById("myCanvas")
	.getBoundingClientRect();

// console.log("canvas info", canvasPosition);

// Get the canvas element
var canvas = document.getElementById("myCanvas");
canvas.width = canvasPosition.width;
canvas.height = canvasPosition.height;
// Get the 2D drawing context
var ctx = canvas.getContext("2d");

let imgPlayer1 = new Image();
imgPlayer1.src = "./assets/images/piece1.png";
let imgPlayer2 = new Image();
imgPlayer2.src = "./assets/images/piece2.png";
let player1Coordinates;
let player2Coordinates;
let deltaX;
let deltaY;
let stepX;
let stepY;
let controlX;
let controlY;
let localStatus;

// Draw the image on the canvas
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
	drawArtifacts(ladder);
	drawArtifacts(snake);
	ctx.drawImage(
		imgPlayer1,
		getCellCoordinates(1).x,
		getCellCoordinates(1).y,
		30,
		30
	); // Draw the image at the current position
	ctx.drawImage(
		imgPlayer2,
		getCellCoordinates(1).x,
		getCellCoordinates(1).y,
		30,
		30
	); // Draw the image at the current position
}
// Draw the Snakes and Ladders artifact
function drawArtifacts(artifact) {
	let artifactArray = Object.entries(artifact);
	let artifactStartPoint = 0;
	let artifactEndPoint = 0;
	for (let i = 0; i < artifactArray.length - 1; i++) {
		artifactStartPoint = getCellCoordinates(Number(artifactArray[i][0]));
		artifactEndPoint = getCellCoordinates(artifactArray[i][1]);
		if (artifact.name === "ladder") {
			ctx.lineWidth = 20;
			ctx.strokeStyle = "black";
			ctx.setLineDash([3, 9]);
			// Begin a new Path
			ctx.beginPath();
			ctx.moveTo(artifactStartPoint.x, artifactStartPoint.y);
			ctx.lineTo(artifactEndPoint.x, artifactEndPoint.y);

			// Draw the Path
			ctx.stroke();
		} else {
			ctx.lineWidth = 3;
			ctx.strokeStyle = "red";
			ctx.setLineDash([]);
			ctx.beginPath();
			ctx.moveTo(artifactStartPoint.x, artifactStartPoint.y);
			ctx.quadraticCurveTo(
				artifactStartPoint.x + 50,
				artifactStartPoint.x + 50,
				artifactEndPoint.x,
				artifactEndPoint.y
			);
			ctx.stroke();
		}
	}
}
// Function to update the position of the image
function update() {
	draw(); // Redraw the canvas with the updated position
}

// Set up a game loop to continuously update and redraw the canvas
function gameLoop() {
	update();
	requestAnimationFrame(gameLoop);
}

// Start the game loop after the image is loaded
imgPlayer1.onload = function () {
	draw(); // Initial draw with the image at the starting position
};
imgPlayer2.onload = function () {
	draw(); // Initial draw with the image at the starting position
};
function movePlayer(gameStatus, nextPosition) {
	localStatus = structuredClone(gameStatus);
	console.log("from test file", localStatus);
	player1Coordinates = getCellCoordinates(localStatus.player1.position);
	player2Coordinates = getCellCoordinates(localStatus.player2.position);

	const currentPosition = localStatus[localStatus.currentPlayer].position;
	animateMove(currentPosition, nextPosition);
}

function animateMove(currentPosition, nextPosition) {
	if (currentPosition < nextPosition) {
		deltaX =
			getCellCoordinates(currentPosition + 1).x -
			getCellCoordinates(currentPosition).x;
		deltaY =
			getCellCoordinates(currentPosition + 1).y -
			getCellCoordinates(currentPosition).y;

		deltaX !== 0 ? (stepX = deltaX / Math.abs(deltaX)) : (stepX = deltaX);
		deltaY !== 0 ? (stepY = deltaY / Math.abs(deltaY)) : (stepY = deltaY);

		controlX = Math.abs(deltaX);
		controlY = Math.abs(deltaY);
		animatePlayer();
		setTimeout(() => animateMove(currentPosition + 1, nextPosition), 800);
	} else {
		button.disabled = false;
		turn.textContent = gameStatus.currentPlayer;
	}
}

function animatePlayer() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawArtifacts(ladder);
	drawArtifacts(snake);
	ctx.drawImage(
		imgPlayer1,
		player1Coordinates.x,
		player1Coordinates.y,
		30,
		30
	);
	ctx.drawImage(
		imgPlayer2,
		player2Coordinates.x,
		player2Coordinates.y,
		30,
		30
	);

	if (localStatus.currentPlayer === "player1") {
		player1Coordinates.x += stepX * 3;
		player1Coordinates.y += stepY * 3;
	} else {
		player2Coordinates.x += stepX * 3;
		player2Coordinates.y += stepY * 3;
	}

	controlX -= Math.abs(stepX * 3);
	controlY -= Math.abs(stepY * 3);

	if (controlX >= 0 && controlY >= 0) {
		requestAnimationFrame(animatePlayer);
	}
}

function getCellCoordinates(position) {
	if (position === 0) position += 1;
	const cell = document.getElementsByClassName(`cell-${position}`);
	// console.log(`cell-${position} `, cell);
	let positionInfo = cell[0].getBoundingClientRect();
	// console.log("before adjustin", positionInfo);
	positionInfo.x =
		positionInfo.x - canvasPosition.left + positionInfo.width / 2;
	positionInfo.y =
		positionInfo.y - canvasPosition.top + positionInfo.height / 2;
	// console.log("after adjustin", positionInfo);
	return positionInfo;
}

//FOR TESTING
// let gameStatus = {
// 	currentPlayer: "player1",
// 	player1: {
// 		name: "player 1",
// 		position: 2,
// 		score: 0,
// 	},
// 	player2: {
// 		name: "player 2",
// 		position: 4,
// 		score: 0,
// 	},
// 	isThereaWinner: false,
// };

// movePlayer(gameStatus, 11);
draw();
export { movePlayer };
