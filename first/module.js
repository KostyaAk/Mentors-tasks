export function lowerCase(str) {
  return (
    str.split('')[0].toUpperCase() +
    str.split('').splice(1).join('').toLowerCase()
  );
}

export function setSpaces(str) {
  const symbol = [',', '.', '?', '!', ':', ';'];
  let arr = str.split('');

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == ' ' && arr[i + 1] == ' ') {
      arr.splice(i, 1);
      i--;
    }
  }
  for (let i = 0; i < arr.length; i++) {
    if (symbol.includes(arr[i])) {
      if (arr[i - 1] == ' ') {
        arr.splice(i - 1, 1);
        i--;
      }
      if (arr[i + 1] !== ' ') {
        arr.splice(i + 1, 0, ' ');
        i--;
      }
    }
  }
  return arr.join('');
}

export function wordCount(str) {
  // Реализация большая, на случай неверного вввода, как во второй задаче. Если считать, что на вход всегда будет
  // поступать строка без знаков препинания и лишних пробелов, то решением было бы много меньше
  const symbol = [',', '.', '?', '!', ':', ';', '\n'];
  let arr = str.split('');

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == ' ' && arr[i + 1] == ' ') {
      arr.splice(i, 1);
      i--;
    }
    if (symbol.includes(arr[i])) {
      if (arr[i - 1] == ' ') {
        arr.splice(i - 1, 1);
        i--;
      }
      if (arr[i + 1] !== ' ') {
        arr.splice(i + 1, 0, ' ');
        i--;
      }
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (symbol.includes(arr[i])) {
      arr.splice(i, 1);
      i--;
    }
  }

  return arr.join('').trim().split(' ').length;
}

export function uniqWord(str) {
  const symbol = [',', '.', '?', '!', ':', ';', '\n'];
  let arr = str.toLowerCase().split('');

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == ' ' && arr[i + 1] == ' ') {
      arr.splice(i, 1);
      i--;
    }
    if (symbol.includes(arr[i])) {
      if (arr[i - 1] == ' ') {
        arr.splice(i - 1, 1);
        i--;
      }
      if (arr[i + 1] !== ' ') {
        arr.splice(i + 1, 0, ' ');
        i--;
      }
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (symbol.includes(arr[i])) {
      arr.splice(i, 1);
      i--;
    }
  }
  // всё что выше требуется только для форматирования входной строки

  let array = arr.join('').trim().split(' ');

  const res = array.reduce(
    (obj, item) =>
      obj[item] ? { ...obj, [item]: obj[item] + 1 } : { ...obj, [item]: 1 },
    {}
  );

  for (let key of Object.keys(res)) {
    console.log(
      `The word "${key}" is included in the string ${res[key]} times `
    );
  }
}
