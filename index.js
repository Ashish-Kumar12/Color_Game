var colors = [];
var pickedColor;
var clickedColor;
var numSquares = 9;
var lives = 4;
var stop;
var selectedMode = document.querySelector(".selected");
var squares = document.querySelectorAll(".squares");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var livesButton = document.getElementById("lives");
var buttons = document.querySelectorAll("button");

initialise();

function initialise() {
    setupModeButtons();
    setupSquares();
    reset();
}

function updateLives(selected) {
    if (selected.textContent === "Easy") {
        numSquares = 3;
        lives = 2;
        livesButton.textContent = lives;
    } else if (selected.textContent === "Medium") {
        numSquares = 6;
        lives = 3;
        livesButton.textContent = lives;
    } else {
        numSquares = 9;
        lives = 4;
        livesButton.textContent = lives;
    }
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            this.classList.add("selected");
            selectedMode = this;
            updateLives(this);
            reset();
        });
    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            clickedColor = this.style.background;
            if (lives) {
                if (clickedColor === pickedColor) {
                    messageDisplay.textContent = "Correct!";
                    resetButton.textContent = "Play Again?";
                    clearInterval(stop);
                    changeColors(clickedColor);
                } else {
                    this.style.background = "#232323";
                    messageDisplay.textContent = "Try Again";
                    lives--;
                    livesButton.textContent = lives;
                    if (lives === 0) {
                        messageDisplay.textContent = "Game Over!!";
                        resetButton.textContent = "Play Again?";
                        clearInterval(stop);
                    }
                }
            }
        });
    }
}

function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors";
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    clearInterval(stop);
    stop = setInterval(varyColor, 1000);
    updateLives(selectedMode);
}

function varyColor() {
    var randColor = randomColor();
    h1.style.background = randColor;
    h1.style.transition = "background 0.5s";
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.background = "whitesmoke";
        buttons[i].style.color = randColor;
        $("button:hover").css({
            background: randColor,
            color: "whitesmoke"
        });
        // buttons[i].addEventListener("mouseenter", function() {
        //     this.style.background = randColor;
        //     this.style.color = "white";
        // });
        // buttons[i].addEventListener("mouseleave", function() {
        //     this.style.background = "whitesmoke";
        //     this.style.color = randColor;
        // });
    }
    selectedMode.style.background = randColor;
    selectedMode.style.color = "white";
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
    h1.style.background = color;
}

resetButton.addEventListener("click", function() {
    reset();
})