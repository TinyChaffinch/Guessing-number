let randomNumber = Math.floor(Math.random() * 100) + 1;

let guesses = document.querySelector('.guesses');
let trys = document.querySelector('.trys');
let lastResult = document.querySelector('.lastResult');
let hidenNum = document.querySelector('.hidenNum');
let lowOrHi = document.querySelector('.lowOrHi');

let guessSubmit = document.querySelector('.guessSubmit');
let guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;

guessSubmit.disabled = true;
guessField.focus();

function rgb(r, g, b) {
    return 'rgb(' + [(r || 0), (g || 0), (b || 0)].join(',') + ')';
}

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
    for (var i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    randomNumber = Math.floor(Math.random() * 100) + 1;
}

const changeHandler = e => {
    const value = e.value;
    e.value = value.replace(/\D/g, '');
}

function isright(obj) {
    if (obj.value == '') {
        guessSubmit.disabled = true;
    } else {
        guessSubmit.disabled = false;
    }
    if (obj.value > 100) obj.value = 100;
    if (obj.value < 1) obj.value = '';
}
