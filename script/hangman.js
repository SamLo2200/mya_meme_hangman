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
var initHint = true;

var isAnswerCorrect = false;
var answeredQuestion = [];
var correctAttemp = 0;

const containerHint = document.getElementById("clue");
const buttonHint = document.getElementById("hint");
const buttonReset = document.getElementById("reset");
const livesDisplay = document.getElementById("mylives");
const correctMatching = document.querySelector("#correctmatching");

const questionDisplay = document.querySelector("#question");
const scoreDisplay = document.querySelector("#score");
const leftToGuessDisplay = document.querySelector("#numberofcharacterlefttoguest");

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
        Question: "福袋又名咩?",

        Answer: "蟹貨福袋",

        Hint: {
            Hint1: "4個字",
            Hint2: "動物嚟",
            Hint3: "床下底",
        },
    },

    Question2: {
        Question: "米亞來自邊個國家?",

        Answer: "北韓",

        Hint: {
            Hint1: "2個字, 係米亞3 歲同啊媽走嘅",
            Hint2: "5月酒雜談講嘅野嚟",
            Hint3: "好難離開嘅國家，離開會有人追",
        },
    },

    Question3: {
        Question: "YK先生又名咩?",

        Answer: "關羽大哥",

        Hint: {
            Hint1: "4個字, 有兩個字係男性嘅稱呼",
            Hint2: "歷史人物嚟",
            Hint3: "同數字有關嘅",
        },
    },

    Question4: {
        Question: "核彈係邊個發明嘅?",

        Answer: "愛因斯坦",

        Hint: {
            Hint1: "唔係正確答案嚟, 4個字",
            Hint2: "同物理有關",
            Hint3: "係喺最近嘅直播入面提過",
        },
    },

    Question5: {
        Question: "正確OBS立即關台嘅方式係咩(如果答案唔係中文嚟請用細階表達同唔好隔格)?",

        Answer: "alt+f4",

        Hint: {
            Hint1: "6個字, 同電腦shortcut有關",
            Hint2: "同小貓有關, 頭一個字係a嚟",
            Hint3: "唔係單純英文字嚟，包括一個數學經常用嘅符號",
        },
    },

    Question6: {
        Question: "米亞收得最多嘅野係咩?",

        Answer: "和菓子",

        Hint: {
            Hint1: "食得嘅",
            Hint2: "3 個字",
            Hint3: "經常用名牌盒裝嘅",
        },
    },

    Question7: {
        Question: "MM嘅訪問做就咗邊個梗嘅誕生?",

        Answer: "55",

        Hint: {
            Hint1: "2個字",
            Hint2: "溝通用嘅",
            Hint3: "觀眾成日用嘅",
        },
    },

    Question8: {
        Question: "Ming 哥提出咗送咩攪到米亞要買多樣回禮?",

        Answer: "嘉頓雜餅",

        Hint: {
            Hint1: "食得嘅, 4個字",
            Hint2: "可以食好耐嘅，新年用嚟送禮一流",
            Hint3: "同 RG30 有關",
        },
    },

    Question9: {
        Question: "米亞1.0 比觀眾起咗個咩花名?",

        Answer: "曾志米",

        Hint: {
            Hint1: "3個字, 某公司不排除提供",
            Hint2: "同聲音有關嘅",
            Hint3: "大頭BB 嘅friend",
        },
    },

    Question10: {
        Question: "火車就嚟撞到路軌上瞓緊覺嘅人，應該要做咩?",

        Answer: "叫醒佢哋信耶蘇",

        Hint: {
            Hint1: "火車難題嗰條live, 之後剪咗做精華",
            Hint2: "句子嚟, 7個字, 關宗教事嘅",
            Hint3: "路軌上嘅人回應: X你老母 _ 信 _ _ ",
        },
    },

    Question11: {
        Question: "有讀寫障礙嘅仆直見到米亞寫嘅問題係word 用紅色 highlight 咗咩?",

        Answer: "靚仔",

        Hint: {
            Hint1: "係一條二揀一題目嘅問題嚟",
            Hint2: "2個字, 仆直成日叫自己做嘅野",
            Hint3: "米亞同仆直都好重視嘅野",
        },
    },

    Question12: {
        Question: "米亞最近嘅新花名係咩（如果有英文字嘅請用細階表達同唔好隔格)?",

        Answer: "準時jj",

        Hint: {
            Hint1: "米亞成日做唔到嘅野",
            Hint2: "同L差唔多意思",
            Hint3: "4個字, 中英混合",
        },
    },

    Question13: {
        Question: "一柱擎天又名咩?",

        Answer: "勝利之劍",

        Hint: {
            Hint1: "4個字, 學御宅藝嗰條live 誕生嘅",
            Hint2: "其中兩個字係古代會用嘅野",
            Hint3: "同武器有關",
        },
    },

    Question14: {
        Question: "米亞1年前用咗甘米嘅皮開live, 觀眾比咗個咩名佢?",

        Answer: "廿米",

        Hint: {
            Hint1: "2個字, 女僕咖啡廳其中一個女僕",
            Hint2: "隻字少咗啲野",
            Hint3: "其中一隻字同一種涼茶嘅名相同",
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
            correctAttemp = correctAttemp + 1;
            domLeftToGuess(correctAttemp, currentAnswerCharArray.length);
        }
    }

    if (compareTwoArrays(currentAnswerCharArray, userInputCharArray)) {
        answeredQuestion.push(currentQuestion);
        alert("Congrats! 你答啱咗!");
        //console.log("U did it!");

        score += 1;

        questionInit();
        domQuestionDisplayUpdate();

        //reset variables
        matchingArray = [];
        correctAttemp = 0;

        //console.log(matchingArray);

        //reset DOM
        correctMatching.innerHTML = `依家啱咗: ${matchingArray}`;
        leftToGuessDisplay.innerHTML = `仲要估多: - 個字`;

        domScoreDisplay();

        //clear canvas
        context.clearRect(0, 0, myStickman.width, myStickman.height);
        context.beginPath();

        life = 10;
    } else {
        //console.log("you failed ");
        life = life - 1;
        animate();

        if (life == 0) {
            var delayInMilliseconds = 100; //0.1 second

            score = 0;

            setTimeout(function () {
                alert(`正確答案: ${currentAnswer}`);
                location.href = "./lose.html";
            }, delayInMilliseconds);
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
    containerHint.innerHTML = `提示 ${currentHintIndex}: ${hintToDisplay}`;

    if (currentHintIndex < 3) {
        currentHintIndex = currentHintIndex + 1;
    } else {
        currentHintIndex = 1;
    }

    return `提示 ${currentHintIndex}: ${hintToDisplay}`;
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

    if (score !== 10) {
        setQuestion();
        getAnswer();
        currentHintIndex = 1;

        while (answeredQuestion.includes(currentQuestion) && i < 100) {
            setQuestion();
            getAnswer();
            //console.log("triggered");

            i++;
            currentHintIndex = 1;
        }
    } else {
        location.href = "./congrats.html";
    }

    if (i == 100) {
        location.href = "./congrats.html";
        i = 0;

        //console.log(i);
    }

    containerHint.innerHTML = `提示: -`;
}

function questionSkipInit() {
    let i = 0;

    if (score !== 10) {
        setQuestion();
        getAnswer();
        currentHintIndex = 1;

        while (answeredQuestion.includes(currentQuestion) && i < 100) {
            setQuestion();
            getAnswer();

            i++;
            currentHintIndex = 1;
        }
    }

    //reset variables
    matchingArray = [];
    correctAttemp = 0;

    //reset DOM
    containerHint.innerHTML = `提示: -`;
    correctMatching.innerHTML = `依家啱咗: ${matchingArray}`;
    resetDomLeftToGuess();
}

function hintHandler() {
    if (initHint) {
        getHint();
    } else {
        currentHint = getHint();
        containerHint.innerHTML = currentHint;
    }
}

// function debugButton() {
//     console.log(currentQuestion, currentAnswer);
//     console.log(currentAnswer);
// }

function domQuestionDisplayUpdate() {
    questionDisplay.innerHTML = `題目: ${currentQuestion.Question}`;
}

function domScoreDisplay() {
    scoreDisplay.innerHTML = `分數: ${score}`;
}

function domLeftToGuess(correntAmount, total) {
    leftToGuessDisplay.innerHTML = `仲要估多: ${total - correntAmount}個字`;
    //console.log(correctAttemp);
}

function resetDomLeftToGuess() {
    leftToGuessDisplay.innerHTML = `仲要估多: - 個字`;
}

function compareTwoArrays(arr1, arr2) {
    //console.log(`Returned ${JSON.stringify(arr1) == JSON.stringify(arr2)}`);
    return JSON.stringify(arr1) == JSON.stringify(arr2);
}
