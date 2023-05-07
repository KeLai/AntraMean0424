
//view
//render word(hidden and normal), word count
class View {
    constructor() {
        this.guessCount = document.querySelector(".guessCount");
        this.wordDisplay = document.querySelector(".wordDisplay");
        this.input = document.querySelector(".input");
        this.newGameBtn = document.querySelector(".newGameBtn");
        this.guessHistory = document.querySelector(".guessHistory");
        this.timer = document.querySelector(".timer");

        this.timeInterval = null;
    }

    changeCount(count) {
        this.guessCount.innerText = count;
    }

    displayWord(word) {
        this.wordDisplay.innerText = word;
    }

    displayGuessHistory(guessHistory) {
        let text = `<p class="guessHistoryCaption">Guess History</p>`;
        guessHistory.forEach((value) => {
            if (value[0] === true) {
                text += `<p>Correct: <span class="correctGuess">${value[1]}</span></p>`;
            } else {
                text += `<p>Incorrect: <span class="wrongGuess">${value[1]}</span></p>`
            }
        })
        this.guessHistory.innerHTML = text;
    }

    startTimer(time, gameOver) {
        this.timer.innerText = time;
        let timeLeft = time;
        this.timeInterval = setInterval(() => {
            this.timer.innerText = --timeLeft;
            if (timeLeft <= 0) {
                this.stopTimer();
                gameOver();
            }
        }, 1000)
    }

    stopTimer() {
        clearInterval(this.timeInterval);
    }
}

//model
//1. retrive data, and hold the current word -> getRandomWord()
//2. hold the count of words
//3. hold the hiddenIndexes
//4. check if input is correct and update word count
class Model {
    constructor(View) {
        this.currentWord = "";
        this.currentWordArr; //2Darray, [hiddenStatus][char]; hiddenStatus:true/false
        this.displayWord = "";
        this.hiddenIndexes = [];

        this.count = 0;
        this.updateTimes = 0;
        this.guessHistory = []; //2Darray, [isCorrectGuess][char]; isCorrectGuess:true/false
        this.successGuessedWordsCount = 0;

        this.View = View;
    }

    //API
    async getRandomWord() { // async always return promise object
        const data = await fetch("https://random-word-api.herokuapp.com/word").then(data => data.json()).catch(err => console.log("data error"));
        const [word] = data;
        this.currentWord = word;     //update currentWord
        // this.currentWord = "helloworld";
        this.getRandomHiddenIndex();    //update hiddenIndexes
        this.generateCurrentWordArr();  //update currentWordArr
        this.generateDisplayedWord();   //update displayWord
    }

    getRandomHiddenIndex() {
        const wordLen = this.currentWord.length;
        if (wordLen == 0) {
            throw new Error("empty word string");
        }
        const randomCount = Math.floor(Math.random() * (wordLen - 1) + 1); //random number of hidden words, 1 <= count <= wordLength - 1
        const uniqueSet = new Set(); // for pick up unique index;
        while (uniqueSet.size < randomCount) { //randomlize hidden index
            let index = Math.floor(Math.random() * wordLen);
            uniqueSet.add(index);
        }
        this.hiddenIndexes = Array.from(uniqueSet);
    }

    generateDisplayedWord() { //according to currentWordArr
        let newDisplay = "";
        this.currentWordArr.forEach((value) => {
            if (value[0] === true) {
                newDisplay += "_"
            } else {
                newDisplay += value[1];
            }
        })
        this.displayWord = newDisplay;
    }

    updateCurrentWordArr(index) {
        this.currentWordArr[index][0] = false;
    }

    generateCurrentWordArr() {
        this.currentWordArr = this.currentWord.split("").map((value, index) => {
            if (this.hiddenIndexes.includes(index)) {
                return [true, value];
            } else {
                return [false, value];
            }
        })
    }

    reset() {
        this.count = 0;
        this.updateTimes = 0;
        this.displayWord = "";
        this.guessHistory = [];
    }

    resetForNewWord() {
        this.updateTimes = 0;
        this.displayWord = "";
        this.guessHistory = [];
    }
    //manipulate View
    updateView() {
        this.View.changeCount(this.count);
        this.View.displayWord(this.displayWord);
        this.View.displayGuessHistory(this.guessHistory);
    }
}
//controller
//1. handle game init()
//2. handle user input
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init(0);
        //new game button
        this.view.newGameBtn.addEventListener("click", () => {
            //reset game
            this.view.stopTimer();
            this.init(0);
        });
        //keypress"Enter"
        this.view.input.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                //guess
                const char = this.view.input.value;
                this.inputGuessing(char);

                //empty inputbox
                this.view.input.value = "";

                //word completed check
                if (this.model.updateTimes === this.model.hiddenIndexes.length) {
                    setTimeout(() => {
                        alert("Congradulations! ");
                        this.model.successGuessedWordsCount++;
                        this.init(1);
                    }, 0)

                }

                //gameover check
                if (this.model.count >= 10) {
                    this.view.stopTimer();
                    this.gameOver();
                }
            }
        });
    }

    //mode:0 or 1; 0=>new game, 1=>new word
    async init(mode) {
        if (mode === 0) {
            this.model.reset();
        } else {
            this.model.resetForNewWord();
        }
        await this.model.getRandomWord();
        this.model.updateView();

        if (mode === 0) {
            this.view.startTimer(60, this.gameOver.bind(this));
        }
    }


    inputGuessing(char) {
        const isDupilicate = this.model.guessHistory.some(value => value[1] === char);
        if (isDupilicate) {
            alert("Oops! You have already guessed this character.");
            return;
        }

        let isFound = 0;
        let checkTimes = 0;
        while (isFound >= 0) {
            checkTimes++;
            isFound = this.model.currentWordArr.findIndex((data) => {
                return (data[0] === true && data[1] === char)
            })
            if (isFound < 0) {
                if (checkTimes === 1) {
                    this.model.guessHistory.push([false, char]); //incorrect guess
                    this.model.count++;
                    this.model.updateView();
                }

                break;
            }
            if (checkTimes === 1) {
                this.model.guessHistory.push([true, char]); //correct guess
            }
            this.model.updateCurrentWordArr(isFound);
            this.model.updateTimes++;
        }

        this.model.generateDisplayedWord();
        this.model.updateView();
    }

    gameOver() {
        setTimeout(async () => {
            alert("Game over! You have guessed " + this.model.successGuessedWordsCount + " word(s).");
            await this.init(0);
        }, 100)
    }
}

const view = new View();
const model = new Model(view);
const controller = new Controller(model, view);
