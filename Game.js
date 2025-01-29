<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wordle Game</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <style>
        body { font-family: Arial, sans-serif; text-align: center; background-color: #1d4b03; color: white; }
        .title { display: flex; justify-content: center; gap: 5px; margin-top: 20px; }
        .letter-box { width: 40px; height: 40px; border-radius: 5px; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; }
        .green { background-color: #029664; color: white; }
        .orange { background-color: #FF931D; color: black; }
        .grid { display: grid; grid-template-columns: repeat(5, 50px); gap: 5px; justify-content: center; margin-top: 20px; }
        .cell { width: 50px; height: 50px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; text-transform: uppercase; }
        .keyboard { display: flex; flex-direction: column; align-items: center; gap: 5px; margin-top: 20px; }
        .key-row { display: flex; justify-content: center; gap: 5px; }
        .key { width: 40px; height: 40px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: bold; background-color: lightgray; color: black; cursor: pointer; }
        .special { width: 80px; }
    </style>
</head>
<body>
    <div class="title">
        <div class="letter-box green">T</div> 
        <div class="letter-box orange">K</div>
        <div class="letter-box green">M</div>
        <div class="letter-box green">E</div>
        <div class="letter-box orange">N</div>
        <div class="letter-box green">A</div>
        <div class="letter-box orange">H</div>
    </div>
    <div id="game"></div>
    <p style="color: white;">Start guessing!</p>
    <div class="keyboard" id="keyboard"></div>
    <script>
        class WordleGame {
            constructor() {
                this.words = ["apple", "grape", "table", "chair", "plant"];
                this.answer = this.words[Math.floor(Math.random() * this.words.length)];
                this.attempts = 0;
                this.currentGuess = "";
                this.createGrid();
                this.createKeyboard();
            }

            createGrid() {
                const game = document.getElementById("game");
                for (let i = 0; i < 6; i++) {
                    const row = document.createElement("div");
                    row.className = "grid";
                    for (let j = 0; j < 5; j++) {
                        const cell = document.createElement("div");
                        cell.className = "cell";
                        row.appendChild(cell);
                    }
                    game.appendChild(row);
                }
            }

            createKeyboard() {
                const keyboard = document.getElementById("keyboard");
                const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
                rows.forEach(row => {
                    const rowDiv = document.createElement("div");
                    rowDiv.className = "key-row";
                    row.split("").forEach(letter => {
                        const key = document.createElement("div");
                        key.className = "key";
                        key.textContent = letter;
                        key.onclick = () => this.handleKeyPress(letter.toLowerCase());
                        rowDiv.appendChild(key);
                    });
                    keyboard.appendChild(rowDiv);
                });
                const specialRow = document.createElement("div");
                specialRow.className = "key-row";

                const backspaceKey = document.createElement("div");
                backspaceKey.className = "key special";
                backspaceKey.textContent = "←";
                backspaceKey.onclick = () => this.deleteLetter();
                specialRow.appendChild(backspaceKey);

                const enterKey = document.createElement("div");
                enterKey.className = "key special";
                enterKey.textContent = "Enter";
                enterKey.onclick = () => this.submitGuess();
                specialRow.appendChild(enterKey);
                
                keyboard.appendChild(specialRow);
            }

            handleKeyPress(letter) {
                if (this.currentGuess.length < 5) {
                    this.currentGuess += letter;
                    this.updateGrid();
                }
            }

            deleteLetter() {
                this.currentGuess = this.currentGuess.slice(0, -1);
                this.updateGrid();
            }

            updateGrid() {
                const row = document.getElementsByClassName("grid")[this.attempts];
                for (let i = 0; i < 5; i++) {
                    row.children[i].textContent = this.currentGuess[i] || "";
                }
            }

            submitGuess() {
                if (this.currentGuess.length !== 5 || !this.words.includes(this.currentGuess)) {
                    alert("Invalid word!");
                    return;
                }
                this.attempts++;
                this.currentGuess = "";
            }
        }

        document.addEventListener("DOMContentLoaded", () => new WordleGame());
    </script>
</body>
</html>
