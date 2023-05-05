
//view
//render word(hidden and normal), word count
class View {
    constructor() {
        this.guessCount = document.querySelector(".guessCount");
        this.wordDisplay = document.querySelector(".wordDisplay");
        this.input = document.querySelector(".input");
        this.newGameBtn = document.querySelector(".newGameBtn");
    }

    changeCount() {
        this.guessCount.innerText = +(this.guessCount.innerText) + 1;
    }

    resetCount() {
        this.guessCount.innerText = 0;
    }

    displayWord(hiddenIndexes, word) {
        let newDisplay = "";
        for (let index in word) {
            if (hiddenIndexes.indexOf(+index) == -1) {
                newDisplay += word[index] + " ";
            } else {
                newDisplay += " _ ";
            }
        }
        this.wordDisplay.innerText = newDisplay;
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
        this.displayWord = "";
        this.hiddenIndexes = [];
        this.count = 0;
    }

    async getRandomWord() { // async always return promise object
        const data = await fetch("https://random-word-api.herokuapp.com/word").then(data => data.json()).catch(err => console.log("data error"));
        const [word] = data;
        this.currentWord = word;
        this.getRandomHiddenIndex();
    }

    getRandomHiddenIndex() {
        const wordLen = this.currentWord.length;
        if (wordLen == 0) {
            throw new Error("empty word string");
        }
        const randomCount = Math.floor(Math.random() * wordLen + 1); //random number of hidden words, 1 <= count < wordLength
        const uniqueSet = new Set(); // for pick up unique index;
        // const randomHiddenIndexes = [];
        while (uniqueSet.size < randomCount) { //randomlize hidden index
            let index = Math.floor(Math.random() * wordLen);
            uniqueSet.add(index);
        }

        this.hiddenIndexes = Array.from(uniqueSet);
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
    }

    async init() {
        this.view.resetCount();
        await this.model.getRandomWord();
        this.view.displayWord(this.model.hiddenIndexes, this.model.currentWord);
    }
}

const model = new Model();
const view = new View();
const controller = new Controller(model, view);
