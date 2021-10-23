// константы для тегов html
const images = document.getElementById("image");
const btnStartGame = document.getElementById("start");
const btnEnterAttempts = document.getElementById("btn");
const helpBut = document.getElementById("help");

// стили для констант
images.style = "display: none;";
btnEnterAttempts.style = "display: none;";
helpBut.style = "display: none;";

// функция старт, котороя запускает всю программу.
function start() {
  btnEnterAttempts.style = "display: block;";
  btnStartGame.style = "display: none;";
}

let attempts = 7; // переменная для создания попыток
let count = 7; // переменная для количества доступных попыток
let pointCount = 0; // Счеткчик точек
let clicks = 0; // подсчет кликов

// функция которая спрашивает пользователя сколько попыток, а так же
// она проверяет введено ли корректное число или не введен ли 0 или не нажата кнопка "отмены"
function enterAttempts() {
  do {
    attempts = +prompt("Please, enter attempts, not null", 7);
  } while (/\D/.test(attempts));
  if (attempts === null || attempts === 0) {
    attempts = 7;
  } else {
    btnEnterAttempts.style = "display: none;";
    images.style = "display: block";
    $("#attempt").text(`Attempts left: ${attempts}`);
    setTimeout(() => {
      helpBut.style = "display: block;";
    }, 3000);
    count = attempts;
    for (let i = 0; i <= attempts; i++) {
      $("#pointMenu").append(`<div id="point${i}"></div>`);
    }
    return attempts, count;
  }
}

// функция генераций рандомной позиции на картинке
function getRandomSizeWidth(minSize, size) {
  return Math.floor(Math.random() * (size - minSize) + minSize);
}
function getRandomSizeHeight(size) {
  return Math.floor(Math.random() * size);
}
let imgSize = 700;
let imgSizeWidth = 1310;
let imgSizeHeight = 700; // переменная размера
let marginSize = 610;
getRandomSizeWidth(marginSize, imgSizeWidth); // вызов функции генерации координат с аргументом размера
getRandomSizeHeight(imgSizeHeight);
$("#imgMap").css({ width: imgSize, height: imgSize }); // задание стилей для картинки через JQuery

// Функция генерации точки которую необходимо найти
let target = {
  x: getRandomSizeWidth(marginSize, imgSizeWidth),
  y: getRandomSizeHeight(imgSizeHeight),
};
console.log(`target: ${target.x - 610}, ${target.y}`); // показать точку в консоли

function help(target) {
  $("#target").text(
    `The point you need has the following coordinates: X: ${
      target.x - 610
    } Y: ${target.y}`
  );
  helpBut.style = "display: none;";
}
// Функция которая находит точку, и отнимает ее от клика
// и возвращает по теореме пифагора расстояние
function distancePifagor(event, target) {
  let resultX = event.pageX - target.x;
  let resultY = event.pageY - target.y;
  let powResultX = resultX * resultX;
  let powResultY = resultY * resultY;

  return Math.sqrt(powResultX + powResultY);
}

// функция отвечающая за то, какое сообщение будет выведен  но относительно дистанции
function distanceToPoint(distance) {
  if (distance < 20) {
    return "Very HOOOT!";
  } else if (distance < 50) {
    return "Hot";
  } else if (distance < 100) {
    return "Warm";
  } else if (distance < 250) {
    return "Cool";
  } else if (distance < 380) {
    return "Cold";
  } else {
    return "Very COLD!";
  }
}

//Функция которая выводит число кликов, кликов которые остались
//и выводит победное или проигрравшое сообщение
$("#imgMap").click((event) => {
  clicks++;
  count--;
  if (clicks <= attempts) {
    $("#heading").text(`Clicks: ${clicks}`);
    let distance = distancePifagor(event, target);
    let distancePoint = distanceToPoint(distance);
    $("#countClicker").text(distancePoint);
    $("#coordinates").text(
      `The point has such coordinates X: ${event.pageX - 610} Y: ${event.pageY}`
    );
    console.log(`${event.pageX - 610} ${event.pageY}`);
    $("#attempt").text(`Attempts left: ${count}`);
    $(`#point${pointCount}`).css({
      position: "absolute",
      width: "5px",
      height: "5px",
      "border-radius": "50%",
      background: "red",
      left: event.pageX,
      top: event.pageY,
    });
    pointCount++;
    if (distance < 10) {
      setTimeout(() => {
        let messageWon = alert("Very nice. You won!");
        if (!messageWon) {
          location.reload();
        }
      }, 1000);
    }
  } else {
    $("#targetPoint").css({
      position: "absolute",
      width: "10px",
      height: "10px",
      "border-radius": "50%",
      background: "blue",
      left: target.x,
      top: target.y,
    });
    setTimeout(() => {
      let messageEnd = alert("You lost no attempts left. Sorry.");
      if (!messageEnd) {
        location.reload();
      }
    }, 2000);
  }
});
