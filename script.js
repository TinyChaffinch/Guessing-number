let startNum = document.querySelector('.startNum');
let endNum = document.querySelector('.endNum');
let startEndBut = document.querySelector('.startEndBut');

let timer = document.querySelector('.timer');
let timecheck = document.querySelector('.timecheck');

let guesses = document.querySelector('.guesses');
let trys = document.querySelector('.trys');
let lastResult = document.querySelector('.lastResult');
let hidenNum = document.querySelector('.hidenNum');
let lowOrHi = document.querySelector('.lowOrHi');

let guessSubmit = document.querySelector('.guessSubmit');
let guessField = document.querySelector('.guessField');

let randomNumber;
let guessCount = 1;
let resetButton;

let timeCounter;

guessField.disabled = true;
guessSubmit.disabled = true;
guessField.focus();

//Функция RGB палитры

function rgb(r, g, b) {
    return 'rgb(' + [(r || 0), (g || 0), (b || 0)].join(',') + ')';
}

//Функция таймера

function timerCount() {
    let i = 61;
    timeCounter = setInterval(
        () => {
            i--;
            timer.textContent = 'Осталось: ' + i + ' секунд';
            if (i === 0) {
                clearInterval(timeCounter);
                timer.textContent = 'Таймер ';
                alert('Время вышло');
                setGameOver();
            }
        },
        1000)
}

//Функция начала игры

function startGame() {
    if (Number(endNum.value) - Number(startNum.value) < 20) {
        alert('Вы ввели некоректные данные. Разница между числами должна составлять минимум 20');
    } else {
        if (timecheck.checked) {
            timerCount();
        }
        let startRand = Number(startNum.value);
        let endRand = Number(endNum.value);
        randomNumber = Math.floor(Math.random() * (startRand - endRand + 1)) + endRand;
        guessField.placeholder = String(startRand) + ' - ' + String(endRand);
        startNum.disabled = true;
        endNum.disabled = true;
        guessField.disabled = false;
        startEndBut.disabled = true;
    }
}

startEndBut.addEventListener('click', startGame);

//Функция проверки ответа

function checkGuess() {
    let userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = 'Ваши предположения: ';
    }
    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNumber) {
        lastResult.style.color = rgb(51, 255, 51);
        lastResult.textContent = 'Поздравляю! Вы угадали число!';
        lowOrHi.textContent = '';
        clearInterval(timeCounter); //Остановка таймера
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!ИГРА ОКОНЧЕНА!!!';
        hidenNum.textContent = 'Загаданным числом было: ' + randomNumber;
        setGameOver();
    } else {
        lastResult.textContent = 'Неверно!';
        lastResult.style.color = rgb(255, 36, 0);
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Загаданое число больше!';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Загаданое число меньше!';
        }
    }

    guessCount++;
    trys.textContent = 'Количество попыток: ' + String(guessCount - 1) + " из 10";
    guessSubmit.disabled = true;
    guessField.value = '';
    guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

//Функция создания копки новой игры и её логика

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Начать новую игру';
    resetButton.classList.add('resetButton');
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;
    var resetParas = document.querySelectorAll('.resultParas p');

    var newcheckbox = document.createElement('input');
    newcheckbox.setAttribute('type', 'checkbox');
    newcheckbox.setAttribute('class', 'timecheck')
    timer.textContent = 'Таймер ';
    timer.appendChild(newcheckbox);
    timecheck = document.querySelector('.timecheck');

    for (var i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    startNum.disabled = false;
    endNum.disabled = false;
    guessField.disabled = true;
    guessSubmit.disabled = true;
    startEndBut.disabled = false;
    guessField.value = '';
    guessField.focus();

    randomNumber = Math.floor(Math.random() * 100) + 1;
}

//Проверки на ввод

const changeHandler = e => {
    const value = e.value;
    e.value = value.replace(/\D/g, '');
}

function isright(obj) {
    if (obj.value == '') {
        guessSubmit.disabled = true;
    }
    if (obj.value > Number(endNum.value)) {
        obj.value = Number(endNum.value);
    }
    if (obj.value < Number(startNum.value)) {
        guessSubmit.disabled = true;
    }
    if (obj.value >= Number(startNum.value)) {
        guessSubmit.disabled = false;
    }

}

//Добавление подсказки минимально возможного числа во второй input

function placeholderHelp() {
    let area = Number(startNum.value) + 20;
    endNum.setAttribute('placeholder', String(area));
}

//Реагирование input на enter

guessField.addEventListener('keydown', (e) => {
    if (guessSubmit.disabled == false) {
        if (e.keyCode === 13) {
            checkGuess();
        }
    }
});