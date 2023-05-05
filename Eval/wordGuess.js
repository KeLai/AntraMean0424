
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

    resetCount() {
        this.guessCount.innerText = 0;
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
        this.displayWord = "";
        this.hiddenIndexes = [];
        this.hiddenChars = [];
        this.count = 0;
    }

    async getRandomWord() { // async always return promise object
        const data = await fetch("https://random-word-api.herokuapp.com/word").then(data => data.json()).catch(err => console.log("data error"));
        const [word] = data;
        this.currentWord = word;
        this.getRandomHiddenIndex();
        this.generateDisplayedWord();
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

    generateDisplayedWord() {
        let newDisplay = "";
        for (let index in this.currentWord) {
            if (this.hiddenIndexes.indexOf(+index) == -1) {
                newDisplay += this.currentWord[index] + " ";
            } else {
                this.hiddenChars.push(this.currentWord[index]);
                newDisplay += " _ ";
            }
        }
        this.displayWord = newDisplay;
    }

    updateDisplayedWord(char) {
        //记录需要更新显示的char的位置
        const indexArr = [];

        //hiddenChar元素的索引号，对应hiddenIndexes元素的索引号,['a','b']=>[3,2]
        //在hiddenChar里找到所有对应的char，记录索引号，然后到hiddenIndexes里拿取原单词数组的index
        const tmpArr = this.hiddenChars.reduce((acc, value, index) => {
            if (value === char) {
                acc.push(index);
            }
            return acc;
        }, []);
        //更新hiddenChars
        this.hiddenChars.filter((value) => {
            if (value !== char) {
                return true;
            }
        })
        //从hiddenIndexes里拿原word的index，更新hiddenIndexes
        for (let i of tmpArr) {
            indexArr.push(this.hiddenIndexes[i]);
            this.hiddenIndexes.splice(i, 1);

        }
        //更新displayWord
        for (let i of indexArr) {
            this.displayWord.split("")[i] = char;
        }
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
                const hiddenChars = this.model.hiddenChars;
                if (hiddenChars.includes("char")) {
                    this.model.updateDisplayedWord();
                } else {
                    this.model.count++;
                    this.view.changeCount(this.model.count)
                }
            }
        });
    }

    async init() {
        this.view.resetCount();
        await this.model.getRandomWord();
        this.view.displayWord(this.model.displayWord);
    }

    checkInputGuess() {

    }
}

const model = new Model();
const view = new View();
const controller = new Controller(model, view);
