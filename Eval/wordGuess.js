
//view
//render word(hidden and normal), word count
class View {
    constructor() {
        this.guessCount = document.querySelector(".guessCount");
        this.wordDisplay = document.querySelector(".wordDisplay");
        this.input = document.querySelector(".input");
        this.newGameBtn = document.querySelector(".newGameBtn");
    }

    changeCount(count) {
        this.guessCount.innerText = count;
    }

    displayWord(word) {
        this.wordDisplay.innerText = word;
    }
}
// const view = new View();
// view.displayWord([], 'ABCD');
// view.changeCount();;

//model
//1. retrive data, and hold the current word -> getRandomWord()
//2. hold the count of words
//3. hold the hiddenIndexes
//4. check if input is correct and update word count
class Model {
    constructor() {
        this.currentWord = "";
        this.currentWordArr; //2Darray, [hiddenStatus][char]; hiddenStatus:true/false
        this.displayWord = "";
        this.hiddenIndexes = [];

        this.count = 0;
        this.updateTimes = 0;
    }
    //he__o l, hello 
    //found = arr.index(); [hidden status][char]

    //while (found){found=arr.index([1,char]) update it to [display][char]}

    async getRandomWord() { // async always return promise object
        // const data = await fetch("https://random-word-api.herokuapp.com/word").then(data => data.json()).catch(err => console.log("data error"));
        // const [word] = data;
        // this.currentWord = word;     //update currentWord
        this.currentWord = "helloworld";
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
        // const randomHiddenIndexes = [];
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
                return [true, ...value];
            } else {
                return [false, ...value];
            }
        })
    }

    reset() {
        this.count = 0;
        this.updateTimes = 0;
    }
}
//controller
//1. handle game init()
//2. handle user input
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
        this.view.newGameBtn.addEventListener("click", () => {
            //reset game
            this.init();
        });
        this.view.input.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                //guess
                const char = this.view.input.value;
                this.inputGuessing(char);

                //empty inputbox
                this.view.input.value = "";

                //gameover check
                if (this.model.count >= 10) {
                    setTimeout(() => {
                        alert("Game over!");
                        this.init();
                    }, 0)
                }
                if (this.model.updateTimes === this.model.hiddenIndexes.length) {
                    setTimeout(() => {
                        alert("Congradulations!");
                        this.init();
                    }, 0)

                }
            }
        });
    }

    async init() {
        this.view.changeCount('0');
        this.model.reset();
        await this.model.getRandomWord();
        this.view.displayWord(this.model.displayWord);
    }

    inputGuessing(char) {
        let isFound = 0
        let checkTimes = 0
        while (isFound >= 0) {
            checkTimes++;
            isFound = this.model.currentWordArr.findIndex((data) => {
                return (data[0] === true && data[1] === char)
            })
            if (isFound < 0) {
                if (checkTimes == 1) {
                    this.model.count++;
                    this.view.changeCount(this.model.count);
                }
                break;
            }
            this.model.updateCurrentWordArr(isFound);
            this.model.updateTimes++;
        }
        this.model.generateDisplayedWord();
        this.view.displayWord(this.model.displayWord);
    }
}

const model = new Model();
const view = new View();
const controller = new Controller(model, view);
