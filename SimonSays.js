<!DOCTYPE html>
<html>
<head>
    <title>Simon Says Game</title>
    <style>
        .btn {
            width: 100px;
            height: 100px;
            margin: 10px;
            cursor: pointer;
            border-radius: 50%;
        }
        #message {
            font-size: 24px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Simon Says Game</h1>
    <div id="message">Press Start to Play</div>
    <div id="buttons">
        <div class="btn" id="red"></div>
        <div class="btn" id="blue"></div>
        <div class="btn" id="green"></div>
        <div class="btn" id="yellow"></div>
    </div>
    <button id="start">Start</button>

    <script>
        const colors = ["red", "blue", "green", "yellow"];
        let gamePattern = [];
        let userClickedPattern = [];
        let level = 0;
        let gameStarted = false;

        function playSound(color) {
            const audio = new Audio(`sounds/${color}.mp3`);
            audio.play();
        }

        function animatePress(color) {
            const button = document.querySelector(`#${color}`);
            button.classList.add("pressed");
            setTimeout(() => {
                button.classList.remove("pressed");
            }, 100);
        }

        function nextSequence() {
            userClickedPattern = [];
            level++;
            document.getElementById("message").textContent = `Level ${level}`;
            const randomColor = colors[Math.floor(Math.random() * 4)];
            gamePattern.push(randomColor);

            for (let i = 0; i < gamePattern.length; i++) {
                setTimeout(() => {
                    playSound(gamePattern[i]);
                    animatePress(gamePattern[i]);
                }, i * 1000);
            }
        }

        function checkAnswer(currentLevel) {
            if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
                if (userClickedPattern.length === gamePattern.length) {
                    setTimeout(nextSequence, 1000);
                }
            } else {
                document.getElementById("message").textContent = "Game Over! Press Start to Play Again";
                playSound("wrong");
                document.body.classList.add("game-over");
                setTimeout(() => {
                    document.body.classList.remove("game-over");
                }, 200);
                startOver();
            }
        }

        function startOver() {
            level = 0;
            gamePattern = [];
            gameStarted = false;
        }

        document.getElementById("start").addEventListener("click", function () {
            if (!gameStarted) {
                gameStarted = true;
                nextSequence();
            }
        });

        document.querySelectorAll(".btn").forEach(button => {
            button.addEventListener("click", function () {
                const userChosenColor = button.id;
                userClickedPattern.push(userChosenColor);
                playSound(userChosenColor);
                animatePress(userChosenColor);
                checkAnswer(userClickedPattern.length - 1);
            });
        });
    </script>
</body>
</html>
