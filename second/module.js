export function plus(num1, num2) {
  let result = '';
  let char = '';
  let twoChars = '';
  let one = 0;

  if (num1.length > num2.length) {
    let diff = num1.length - num2.length;
    for (let i = 0; i < diff; i++) {
      num2 = '0' + num2;
    }
  } else {
    let diff = num2.length - num1.length;
    for (let i = 0; i < diff; i++) {
      num1 = '0' + num1;
    }
  }

  for (let i = num1.length - 1; i >= 0; i--) {
    if (Number(num1[i]) + Number(num2[i]) < 10) {
      result = Number(num1[i]) + Number(num2[i]) + one + result;
      one = 0;
    } else {
      twoChars = Number(num1[i]) + Number(num2[i]) + one;
      char = String(twoChars).slice(1, 2);
      result = char + result;
      one = 1;
    }
  }
  return result;
}

export function minus(num1, num2) {
  let result = '';
  let swap = false;
  const arrChar = [];

  if (num1.length > num2.length) {
    let diff = num1.length - num2.length;
    for (let i = 0; i < diff; i++) {
      num2 = '0' + num2;
    }
  } else {
    let diff = num2.length - num1.length;
    for (let i = 0; i < diff; i++) {
      num1 = '0' + num1;
    }

    num1 = [num2, (num2 = num1)][0];
    swap = true;
  }

  for (let i = num1.length - 1; i >= 0; i--) {
    arrChar[i] = Number(num1[i]) - Number(num2[i]);
  }

  for (let i = arrChar.length - 1; i > 0; i--) {
    if (arrChar[i] < 0) {
      arrChar[i] = 10 + arrChar[i];
      arrChar[i - 1] = arrChar[i - 1] - 1;
    }
  }

  while (arrChar[0] === 0) {
    arrChar.shift();
  }

  result = arrChar.length ? arrChar.join('') : '0';

  return swap ? -result : result;
}

export function mult(num1, num2) {
  const number1 = num1.split('').reverse();
  const number2 = num2.split('').reverse();
  const result = [];

  for (let i = 0; i < number1.length; i++) {
    for (let j = 0; j < number2.length; j++) {
      let currNum = number1[i] * number2[j];
      result[i + j] = result[i + j] ? result[i + j] + currNum : currNum;
    }
  }

  for (let i = 0; i < result.length; i++) {
    let chislo = result[i] % 10;
    let move = Math.floor(result[i] / 10);
    result[i] = chislo;

    if (result[i + 1]) {
      result[i + 1] += move;
    } else if (move != 0) {
      result[i + 1] = move;
    }
  }
  return result.reverse().join('');
}

export function division(num1, num2) {
  let num = String(num1);
  let numLength = num.length;
  let remainder = 0;
  let result = '';
  let count = 0;
  let digit;
  let temp;
  while (count < numLength + 3) {
    //показывать 3 знака после запятой
    digit = count < numLength ? Number(num[count]) : 0;

    if (count == numLength) {
      result = result + '.';
    }

    result = result + Math.floor((digit + remainder * 10) / num2);
    remainder = (digit + remainder * 10) % num2;
    count++;
  }

  temp = result.split('');
  while (temp[0] === '0') {
    temp.shift();
  }
  result = temp.join('');

  return result;
}
