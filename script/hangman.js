//const

var answerDisplay = document.getElementById("hold");
var answer = "";
var hint = "";
var life = 10;
var score = 0;
var wordDisplay = [];
var winningCheck = "";

var matchingArray = [];
var currentAnswerCharArray;

var currentHintIndex = 1;
var currentHint;

var currentQuestionValue = "";
var currentQuestion;
var currentAnswer = "";

var initStatus = true;

var isAnswerCorrect = false;
var answeredQuestion = [];

const containerHint = document.getElementById("clue");
const buttonHint = document.getElementById("hint");
const buttonReset = document.getElementById("reset");
const livesDisplay = document.getElementById("mylives");
const correctMatching = document.querySelector("#correctmatching");

const questionDisplay = document.querySelector("#question");
const scoreDisplay = document.querySelector("#score");

//HangMan Related
var myStickman = document.getElementById("stickman");
var context = myStickman.getContext("2d");

const drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];

//HangMan
function animate() {
    const fn = drawArray[life];
    fn();
}

function canvas() {
    // myStickman = document.getElementById("stickman");
    // context = myStickman.getContext("2d");
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

    Question3: {
        Question: "打咗機未?",

        Answer: "打咗",

        Hint: {
            Hint1: "打咗機未? 1",
            Hint2: "打咗機未? 2",
            Hint3: "打咗機未? 3",
        },
    },

    Question4: {
        Question: "打咗code未?",

        Answer: "打咗",

        Hint: {
            Hint1: "打咗code未? 1",
            Hint2: "打咗code未? 2",
            Hint3: "打咗code未? 3",
        },
    },
};

if (initStatus) {
    currentQuestion = getRandomQuestion();
    getAnswer();
    // console.log(currentQuestion.Question);
    // questionDisplay.innerHTML = `題目: ${currentQuestion.Question}`;

    domQuestionDisplayUpdate();

    if (initStatus) {
        initStatus = false;
    }
}

//My Code

function getUserInput() {
    inputBox = document.querySelector("#input_box");
    let userInput = inputBox.value;

    let arrayCharacter = userInput.split("");
    //console.log(arrayCharacter);
    inputBox.value = "";

    checkLetters(arrayCharacter);
}

function checkLetters(userInputCharArray) {
    currentAnswerCharArray = currentAnswer.split("");

    for (let i = 0; i < userInputCharArray.length; i++) {
        //console.log(`This is the answer: ${answer}`);

        // answer = "香港".split("");
        //console.log(`This is I: ${i}`);

        //console.log(userInputCharArray[i]);
        // const regex = new RegExp(userInputCharArray);
        // console.log(regex);

        if (currentAnswerCharArray.includes(userInputCharArray[i]) && !matchingArray.includes(userInputCharArray[i])) {
            matchingArray.push(userInputCharArray[i]);
            //console.log(`This is the array list ${matchingArray}`);
            correctMatching.innerHTML = `依家啱咗: ${matchingArray}`;
        }
    }

    if (compareTwoArrays(currentAnswerCharArray, userInputCharArray)) {
        answeredQuestion.push(currentQuestion);
        alert("Congrats! 你答啱咗!");
        //console.log("U did it!");
        questionInit();
        domQuestionDisplayUpdate();

        matchingArray = [];

        //console.log(matchingArray);
        correctMatching.innerHTML = `依家啱咗: ${matchingArray}`;

        score += 1;
        domScoreDisplay();

        //clear canvas
        context.clearRect(0, 0, myStickman.width, myStickman.height);
        context.beginPath();

        life = 10;
    } else {
        console.log("you failed ");
        life = life - 1;
        animate();

        if (life == 0) {
            alert("你輸咗 QaQ");
            location.reload();
        }
    }
}

function setQuestion() {
    currentQuestion = getRandomQuestion();
    domQuestionDisplayUpdate();
    //console.log(currentQuestion);
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
}

function questionInit() {
    let i = 0;
    if (score < 4) {
        setQuestion();
        getAnswer();

        while (answeredQuestion.includes(currentQuestion) && i < 100) {
            setQuestion();
            getAnswer();
            console.log("triggered");

            i++;
        }
    }

    if (i == 100) {
        location.href = "./congrets.html";
    }
}

function questionSkipInit() {
    setQuestion();
    getAnswer();
}

function hintHandler() {
    currentHint = getHint();
    containerHint.innerHTML = currentHint;
    // console.log(currentHint);
}

function debugButton() {
    console.log(currentQuestion, currentAnswer);
    console.log(currentAnswer);
}

function domQuestionDisplayUpdate() {
    questionDisplay.innerHTML = `題目: ${currentQuestion.Question}`;
}

function domScoreDisplay() {
    scoreDisplay.innerHTML = `分數: ${score}`;
}

function compareTwoArrays(arr1, arr2) {
    console.log(`Returned ${JSON.stringify(arr1) == JSON.stringify(arr2)}`);
    return JSON.stringify(arr1) == JSON.stringify(arr2);
}
