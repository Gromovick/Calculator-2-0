const number_list = document.querySelectorAll(".number");
const input = document.querySelector(".number-input");
const input_wrapper = document.querySelector(".input");
const input_forFont = document.querySelector(".input-wrapper");
const old = document.querySelector(".old");
const change = document.querySelector("#change");
let global_operator = "";
let num1 = 0;
let eq_num = 0;
let eq_isGoing = 0;
let iSequal = false;
let isClicked = false;
let animationGoing = false;
const operators = ["+", "-", "/", "*", "="];
const html_operators = document.querySelectorAll(".operator");
let old_char = "";
let started = false;

function addNumber(number) {
  if (animationGoing) {
    return;
  }
  if (
    (input.innerText === "0" || operators.includes(old_char)) &&
    number !== "."
  ) {
    input.innerText = number;
    old_char = number;
  } else {
    if ([...(input.innerText + "")].length >= 15) {
      fallNumber(number);
    } else {
      if([...(input.innerText + "")].includes(".") && number === "."){
        return;
      }
      if (input.innerText === "0" && number === ".") {
        input.innerText = "0" + number;
      } else {
        input.innerText += number;
        console.log(number);
      }
      checkFontSize();
    }
  }
  // checkFontSize(true);
}

function checkOper(operator, num2) {
  eq_isGoing = 0;
  eq_num = 0;
  switch (operator) {
    case "+":
      num1 = num1 + num2;
      break;
    case "*":
      num1 = num1 * num2;
      break;
    case "-":
      num1 = num1 - num2;
      break;
    case "/":
      num1 = num1 / num2;
      num1 = num1.toFixed(13);
      num1 = parseFloat(num1);
      break;
  }
}

function Methods(get_operator) {
  if (animationGoing) {
    return;
  }
  console.log("OPERAS");
  if (started) {
    let num2 = parseFloat(input.innerText);
    if (old_char === global_operator) {
      old.innerText = `${num1} ${get_operator}`;
      old_char = get_operator;
      global_operator = get_operator;
      return;
    }
    checkOper(global_operator, num2);
    input.innerText = num1;
  } else {
    num1 = parseFloat(input.innerText);
    eq_isGoing = 0;
  }

  old.innerText = `${num1} ${get_operator}`;
  old_char = get_operator;
  global_operator = get_operator;

  // console.log("Started", true);
  // console.log("Old_char", old_char);
  // console.log("Operator", get_operator);
  started = true;
}

equal.addEventListener("click", () => {
  if (animationGoing) {
    return;
  }
  console.log("EQUAL");
  let num2 = 0;
  if (eq_isGoing === 0) {
    num2 = parseFloat(input.innerText);
    eq_num = num2;
    // console.log("Eq", eq_num);
  }
  console.log("Num1", num1);
  if (eq_isGoing > 0) {
    num1 = parseFloat(input.innerText);
  }
  console.log("Num1", num1);
  num2 = eq_num;
  console.log("Eq", eq_num);
  if (global_operator === "+") {
    input.innerText = num1 + num2;
    old.innerText = `${num1} + ${num2}=`;
  } else if (global_operator === "*") {
    input.innerText = num1 * num2;
    old.innerText = `${num1} * ${num2}=`;
  } else if (global_operator === "-") {
    input.innerText = num1 - num2;
    old.innerText = `${num1} - ${num2}=`;
  } else if (global_operator === "/") {
    let result = num1 / num2;
    result = result.toFixed(13);
    input.innerText = parseFloat(result);
    old.innerText = `${num1} / ${num2}=`;
  }
  started = false;
  old_char = "=";
  eq_isGoing++;
  console.log([...(input.innerText.split() + "")]);
  checkFontSize();
});

clear.addEventListener("click", (event) => {
  old_char = "";
  global_operator = "";
  started = false;

  playAnimation(event);
  // checkFontSize(true);
});

html_operators.forEach((elem) => {
  elem.addEventListener("click", () => {
    Methods(elem.innerText);
    checkFontSize();
  });
});

number_list.forEach((element) => {
  element.addEventListener("click", () => {
    addNumber(element.innerText);
  });
});

const del = document.getElementById("del");
del.addEventListener("click", delNumber);

function delNumber() {
  if (old_char === "=" || animationGoing) {
    return;
  }
  const arr = [...(input.innerText.split() + "")];
  arr.pop();
  if (arr.join("") === "") {
    arr.push(0);
  }
  input.innerText = arr.join("");
}

function playAnimation(event) {
  console.log("Here");
  if (animationGoing) {
    return;
  }
  setTimeout(() => {
    animationGoing = true;
    event.target.style.pointerEvents = "none";
    const back = document.querySelector(".back");
    const input = document.querySelector(".under-back");
    const input_text = document.querySelector(".number-input");

    const startAnim = () => {
      input.style.animation = "input .5s ease";
      back.style.transform = "translateX(0%)";
      back.style.opacity = "1";
      back.style.visibility = "visible";
      back.style.transition =
        "background-position-x 3800ms cubic-bezier(.56,.44,.31,1.16), transform .5s ease";

      back.style.backgroundPositionX = "-12150px";

      setTimeout(() => {
        back.style.opacity = "0";
        back.style.visibility = "hidden";
        back.style.transition = "";
        back.style.transform = "translateX(100%)";
        back.style.backgroundPositionX = "0px";
        input.style.animation = "";
        event.target.style.pointerEvents = "visible";
        animationGoing = false;
      }, 3810);

      setTimeout(() => {
        input_text.innerText = "0";
        old.innerText = ""; // What's 'old'? Make sure it's defined.
        input_forFont.style.fontSize = "64px";
      }, 1000);
    };

    startAnim();
  }, 500);
}

function checkFontSize() {
  if ([...(input.innerText + "")].length > 11) {
    input_forFont.style.fontSize = "29px";
    // input.style.lineHeight = "42px";
  } else if ([...(input.innerText + "")].length > 7) {
    input_forFont.style.fontSize = "42px";
    // input.style.lineHeight = "42px";
  }
}

function fallNumber(num) {
  const fall_wrapper = document.querySelector(".falling-number-wrapper");
  const fall_num = document.createElement("span");
  fall_num.classList.add("falling-number-item", "fall");
  fall_num.innerText = num;
  fall_wrapper.appendChild(fall_num);
  setTimeout(() => {
    fall_num.remove();
  }, 3000);
}

function minusPlus() {
  if (parseFloat(input.innerText) > 0) {
    if ([...(input.innerText + "")][0] === "-") {
      return;
    }
    input.innerText = "-" + input.innerText;
  } else {
    input.innerText = parseFloat(input.innerText) * -1;
  }
}

change.addEventListener("click", minusPlus);
