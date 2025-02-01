class WordleGame {
    constructor() {
        this.currentRow = 0;
        this.nextRowBlock = 0;
        this.score = 0;
        this.gameFin = false;
        this.gameOn = false;
        this.maxBlock = 5;
        this.level = 'beginner';
        this.difficulty = 'easy';
        this.mustUse = '';
        this.userScore = 0;
        this.currentStreak = 0;
        this.username = '';
        this.wordLists = {
            beginner: [],
            intermediate: [],
            advanced: [],
            custom: [],
            fullList: []
        };
        this.chosenWord = '';
    }

    async startGame(level) {
        this.gameOn = true;
        this.level = level;
        document.getElementById('difficultySelectBtn').innerText = this.level;

        let data = await this.getWords();
        if (data.words_string.length > 0) {
            this.wordLists.beginner = data.beginner;
            this.wordLists.intermediate = data.intermediate;
            this.wordLists.advanced = data.advanced;
            this.wordLists.custom = data.custom;
            this.wordLists.fullList = data.words_string.split(', ').map(item => item.trim());
        }

        document.getElementById('notification').innerText = 'بدء التخمين!';
        this.chosenWord = this.getRandomWord().toUpperCase();
        console.log(this.chosenWord);

        document.addEventListener('keyup', (event) => this.handleKeyPress(event));
    }

    handleKeyPress(event) {
        if (this.gameFin) return;

        let alphabet = 'abcdefghijklmnopqrstuvwxyz';
        let wordRow = document.getElementsByClassName('row')[this.currentRow];
        let rowBlockEl = wordRow.childNodes;

        if (alphabet.includes(event.key.toLowerCase())) {
            let letter = event.key.toUpperCase();
            if (this.nextRowBlock < this.maxBlock) {
                rowBlockEl[this.nextRowBlock].innerText = letter;
                this.nextRowBlock++;
            }
        } else if (event.key === 'Enter') {
            this.submitWord(wordRow);
        } else if (event.key === 'Backspace' && this.nextRowBlock > 0) {
            this.nextRowBlock--;
            rowBlockEl[this.nextRowBlock].innerText = '';
        }
    }

    checkAnswer(wordRow, answer) {
        let answerArray = answer.toUpperCase().split('');
        let notification = '';

        wordRow.childNodes.forEach((block, index) => {
            let letter = answerArray[index];
            if (this.chosenWord.includes(letter)) {
                if (this.chosenWord[index] === letter) {
                    this.score++;
                    block.className = 'row_block blockGreen';
                    notification += `الحرف ${letter} في مكانه الصحيح <br/>`;
                } else {
                    block.className = 'row_block blockGold';
                    notification += `الحرف ${letter} موجود في الكلمة بترتيب مختلف <br/>`;
                }
            }
			block.className = 'row_block blockGold';
        });

        document.getElementById('notification').innerHTML = notification;

        if (this.score === this.maxBlock) {
            this.handleWin();
        } else if (this.currentRow === 5) {
            this.handleLoss();
        } else {
            this.score = 0;
            this.nextRowBlock = 0;
            this.currentRow++;
        }
    }

    handleWin() {
        let scoreLevel = (this.level === 'beginner') ? 1 : (this.level === 'intermediate' ? 2 : 3);
        this.userScore += (scoreLevel * 10) - ((scoreLevel + 1) * this.currentRow);

        let storageKey = `score${this.difficulty}${this.level}`;
        if (this.userScore > localStorage.getItem(storageKey)) {
            localStorage.setItem(storageKey, this.userScore);
        }

        document.getElementById('notification').innerText = `ممتاز لقد فزت، نتيجتك هي: ${this.userScore}`;
        this.endGame();
        this.submitScore();
    }

    handleLoss() {
        this.userScore -= 10;
        document.getElementById('notification').innerText = `لقد خسرت، الكلمة الصحيحة هي ${this.chosenWord}, وحصلت على ${this.userScore}`;
        this.endGame();
        this.submitScore();
    }

    submitWord(wordRow) {
        if (this.nextRowBlock < this.maxBlock) {
            document.getElementById('notification').innerText = `يجب عليك ادخال ${this.maxBlock} محارف`;
            return;
        }

        let answer = wordRow.innerText.replace(/[\n\r]/g, '');
        if (this.wordLists.fullList.includes(answer)) {
            if (this.difficulty === 'difficult' && !this.mustUse.every(char => answer.includes(char))) {
                document.getElementById('notification').innerText = 'يجب عليك اختيار محارف';
                return;
            }
            this.checkAnswer(wordRow, answer);
        } else {
            document.getElementById('notification').innerText = 'الكلمة ليست في قائمة الكلمات!';
        }
    }

    endGame() {
        this.gameFin = true;
        document.removeEventListener('keyup', this.handleKeyPress);
    }

    async submitScore() {
        try {
            const response = await fetch('/submit-score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: this.username, score: this.userScore })
            });
            console.log('Score submitted:', await response.json());
        } catch (error) {
            console.error('Error submitting score:', error);
        }
    }

    async getWords() {
        try {
            const response = await fetch(`/get-words?level=${this.level}`, { method: 'GET' });
            return await response.json();
        } catch (error) {
            console.error('Error fetching words:', error);
            return { words_string: '', beginner: [], intermediate: [], advanced: [], custom: [] };
        }
    }

    getRandomWord() {
        return this.wordLists.fullList[Math.floor(Math.random() * this.wordLists.fullList.length)];
    }
}

// Instantiate and start the game
const game = new WordleGame();
