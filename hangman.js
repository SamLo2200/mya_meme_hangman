//const
var answerDisplay = document.getElementById("hold");
var answer = "";
var hint = "";
var life = 10;
var wordDisplay = [];
var winningCheck = "";

var currentHintIndex = 1;
var currentHint;

var currentQuestionValue = "";
var currentQuestion;
var currentAnswer = "";

var initStatus = true;

var isAnswerCorrect = false;

const containerHint = document.getElementById("clue");
const buttonHint = document.getElementById("hint");
const buttonReset = document.getElementById("reset");
const livesDisplay = document.getElementById("mylives");
var myStickman = document.getElementById("stickman");
var context = myStickman.getContext("2d");

const questionDisplay = document.querySelector("#question");

//Questionsssss
const Question = {
    Question1: {
        Question: "你今日食咗飯未呀?",

        Answer: "食咗",

        Hint: {
            Hint1: "今日你好似出咗街",
            Hint2: "你睇下朋友個ig",
            Hint3: "你睇下whatsapp",
        },
    },

    Question2: {
        Question: "交咗校巴費未?",

        Answer: "交咗",

        Hint: {
            Hint1: "睇下e-class",
            Hint2: "睇下銀包",
            Hint3: "問你屋企人",
        },
    },
};

if (initStatus) {
    currentQuestion = getRandomQuestion();
    // console.log(currentQuestion.Question);
    questionDisplay.innerHTML = `題目: ${currentQuestion.Question}`;
    if (initStatus) {
        initStatus = false;
    }
}

// function handleClick(event) {
//   const isButton = event.target.nodeName === "BUTTON";
//   if (isButton) {
//     //console.dir(event.target.id);
//     //console.log(isButton);
//     const buttonId = document.getElementById(event.target.id);
//     buttonId.classList.add("selected");
//   }
//   return;
// }

//set question,answer and hint

function setAnswer() {
    const categoryOrder = Math.floor(Math.random() * categories.length);
    const chosenCategory = categories[categoryOrder];
    const wordOrder = Math.floor(Math.random() * chosenCategory.length);
    const chosenWord = chosenCategory[wordOrder];

    const categoryNameJS = document.getElementById("categoryName");
    categoryNameJS.innerHTML = question[categoryOrder];

    //console.log(chosenCategory);
    //console.log(chosenWord);
    answer = chosenWord;
    hint = hints[categoryOrder][wordOrder];
    answerDisplay.innerHTML = generateAnswerDisplay(chosenWord);
}

function generateAnswerDisplay(word) {
    var wordArray = word.split("");
    //console.log(wordArray);
    for (var i = 0; i < answer.length; i++) {
        if (wordArray[i] !== "-") {
            wordDisplay.push("_");
        } else {
            wordDisplay.push("-");
        }
    }
    return wordDisplay.join(" ");
}

buttonHint.addEventListener("click", showHint);
//setting initial condition
function init() {
    answer = "";
    hint = "";
    life = 10;
    wordDisplay = [];
    winningCheck = "";
    context.clearRect(0, 0, 400, 400);
    canvas();
    // containerHint.innerHTML = `提示: `;
    livesDisplay.innerHTML = `You have ${life} lives!`;
    setAnswer();
    container.innerHTML = generateButton();
    container.addEventListener("click", handleClick);
    console.log(answer);
    //console.log(hint);
}

window.onload = init();

//reset (play again)
buttonReset.addEventListener("click", init);

//guess click
function guess(event) {
    const guessWord = event.target.id;
    const answerArray = answer.split("");
    var counter = 0;
    if (answer === winningCheck) {
        livesDisplay.innerHTML = `YOU WIN!`;
        return;
    } else {
        if (life > 0) {
            for (var j = 0; j < answer.length; j++) {
                if (guessWord === answerArray[j]) {
                    wordDisplay[j] = guessWord;
                    console.log(guessWord);
                    answerDisplay.innerHTML = wordDisplay.join(" ");
                    winningCheck = wordDisplay.join("");
                    //console.log(winningCheck)
                    counter += 1;
                }
            }
            if (counter === 0) {
                life -= 1;
                counter = 0;
                animate();
            } else {
                counter = 0;
            }
            if (life > 1) {
                livesDisplay.innerHTML = `You have ${life} lives!`;
            } else if (life === 1) {
                livesDisplay.innerHTML = `You have ${life} life!`;
            } else {
                livesDisplay.innerHTML = `GAME OVER!`;
            }
        } else {
            return;
        }
        console.log(wordDisplay);
        //console.log(counter);
        //console.log(life);
        if (answer === winningCheck) {
            livesDisplay.innerHTML = `YOU WIN!`;
            return;
        }
    }
}

container.addEventListener("click", guess);

// Hangman
function animate() {
    drawArray[life]();
    //console.log(drawArray[life]);
}

function canvas() {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
}

function head() {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext("2d");
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
}

function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
}

function frame1() {
    draw(0, 150, 150, 150);
}

function frame2() {
    draw(10, 0, 10, 600);
}

function frame3() {
    draw(0, 5, 70, 5);
}

function frame4() {
    draw(60, 5, 60, 15);
}

function torso() {
    draw(60, 36, 60, 70);
}

function rightArm() {
    draw(60, 46, 100, 50);
}

function leftArm() {
    draw(60, 46, 20, 50);
}

function rightLeg() {
    draw(60, 70, 100, 100);
}

function leftLeg() {
    draw(60, 70, 20, 100);
}

var drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];

//My Code

function getUserInput() {
    inputBox = document.querySelector("#input_box");
    let userInput = inputBox.value;

    let arrayCharacter = userInput.split("");
    console.log(arrayCharacter);
    inputBox.value = "";

    checkLetters(arrayCharacter);
}

function checkLetters(userInputCharArray) {
    var matchingArray = [];
    questionInit();

    for (let i = 0; i < userInputCharArray.length; i++) {
        answer = currentAnswer.split("");
        console.log(`This is the answer: ${answer}`);
        // answer = "香港".split("");
        //console.log(`This is I: ${i}`);

        //console.log(userInputCharArray[i]);
        // const regex = new RegExp(userInputCharArray);
        // console.log(regex);

        if (answer.includes(userInputCharArray[i])) {
            matchingArray.push(userInputCharArray[i]);
            console.log(`This is the array list ${matchingArray}`);
        }

        if (matchingArray.toString() == answer.toString()) {
            console.log("U did it!");
        } else {
            console.log("you failed ");
            // life = life - 1;
            // animate();
        }
    }
}

function setQuestion() {
    //console.log(currentHint);

    // const questionKeys = Object.keys(Question);
    // const randomQuestionKey = questionKeys[Math.floor(Math.random() * questionKeys.length)];
    // //Display the corresponding question of the key index
    // const randomQuestion = Question[randomQuestionKey];

    // console.log("Question: " + randomQuestion.Question);

    if (isAnswerCorrect || initStatus) {
        currentQuestion = getRandomQuestion();
        //console.log(currentQuestion);
        if (initStatus) {
            initStatus = false;
        }
    } else {
        console.log(`setQuestion Triggered`);
    }

    //getHint();
}

function getHint() {
    const hintKeys = Object.keys(currentQuestion.Hint);

    const hintToDisplayKey = hintKeys[currentHintIndex - 1];
    const hintToDisplay = currentQuestion.Hint[hintToDisplayKey];
    // console.log(`${hintToDisplayKey}: ${hintToDisplay}`);

    if (currentHintIndex < 3) {
        currentHintIndex = currentHintIndex + 1;
    } else {
        currentHintIndex = 1;
    }

    return `題示 ${currentHintIndex}: ${hintToDisplay}`;
}

function getRandomQuestion() {
    const questionKeys = Object.keys(Question);
    const randomQuestionKey = questionKeys[Math.floor(Math.random() * questionKeys.length)];
    //Display the corresponding question of the key index
    const randomQuestion = Question[randomQuestionKey];

    //console.log("Question: " + randomQuestion.Question + "[getRandomQuestion]");

    return randomQuestion;
}

function getAnswer() {
    //console.log(`The answer is: ${currentQuestion.Answer}`);
    currentAnswer = currentQuestion.Answer;
    //console.log(currentAnswer);
}

function displayHandler() {
    isAnswerCorrect = false;
    setQuestion();
    //getHint();
}

function questionInit() {
    setQuestion();
    getAnswer();
}

function hintHandler() {
    currentHint = getHint();
    containerHint.innerHTML = currentHint;
    // console.log(currentHint);
}
