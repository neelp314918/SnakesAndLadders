    let player1Score = 0;
    let player2Score = 0;

    function updateScoreboard() {
    document.getElementById("player1Score").textContent = player1Score;
    document.getElementById("player2Score").textContent = player2Score;
    }

    function updateWinner(player) {
    document.getElementById("player1").classList.remove("winner");
    document.getElementById("player2").classList.remove("winner");
    document.getElementById("player" + player).classList.add("winner");
    }

    function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
    }

    function playTurn(player) {
    const diceResult = rollDice();
    if (player === 1) {
        player1Score += diceResult;
        if (player1Score >= 100) {
        player1Score = 100;
        updateWinner(1);
        alert("Player 1 wins!");
        }
    } else {
        player2Score += diceResult;
        if (player2Score >= 100) {
        player2Score = 100;
        updateWinner(2);
        alert("Player 2 wins!");
        }
    }
    updateScoreboard();
    }

    let currentPlayer = 1;
    setInterval(() => {
    playTurn(currentPlayer);
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    }, 1000);


    