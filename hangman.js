//const
var answerDisplay = document.getElementById("hold");
var answer = "";
var hint = "";
var life = 10;
var wordDisplay = [];
var winningCheck = "";
const containerHint = document.getElementById("clue");
const buttonHint = document.getElementById("hint");
const buttonReset = document.getElementById("reset");
const livesDisplay = document.getElementById("mylives");
var myStickman = document.getElementById("stickman");
var context = myStickman.getContext("2d");

//init Questionsssss
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

//word array
const question = ["The Chosen Category Is Premier League Football Teams", "The Chosen Category Is Films", "The Chosen Category Is Cities"];

const categories = [
    ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
    ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
    ["manchester", "milan", "madrid", "amsterdam", "prague"],
];

const hints = [
    ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
    ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
    ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"],
];

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

function showHint() {
    containerHint.innerHTML = `提示: ${hint}`;
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
    containerHint.innerHTML = `提示: `;
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

    for (let i = 0; i < userInputCharArray.length; i++) {
        answer = "米亞世一".split("");
        console.log(`This is I: ${i}`);

        //console.log(userInputCharArray[i]);

        const regex = new RegExp(userInputCharArray);

        if (answer.includes(userInputCharArray[i])) {
            matchingArray.push(userInputCharArray[i]);
            console.log(`This is the array list ${matchingArray}`);
        }
    }
}

function randomQuestionIndex() {
    // console.log(`This is the length of the array: ${question.length}`);
    // console.log(Math.floor(Math.random() * question.length));

    const questionKeys = Object.keys(Question);
    const randomQuestionKey = questionKeys[Math.floor(Math.random() * questionKeys.length)];
    const randomQuestion = Question[randomQuestionKey];

    console.log("Question: " + randomQuestion.Question);

    console.log("Hints:");
    Object.values(randomQuestion.Hint).forEach((hint, index) => {
        console.log("Hint" + (index + 1) + ": " + hint);
    });
}
