class Product {
  constructor(name, price, quantity, description) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }
}

const sourceArray = [
  new Product('kostya', 10, 5, 'beautiful and clever boy'),
  new Product('kosta', 10, 7, 'beautiful and clever boy'),
  new Product('danila', 1, 7, 'beautiful and clever man'),
  new Product('daniil', 3, 9, 'beautiful and clever man'),
  new Product('sergey', 60, 7, 'beautiful and clever boy'),
  new Product('jenya', 70, 8, 'beautiful and clever boy'),
  new Product('andrew', 10, 7, 'beautiful and clever boy'),
  new Product('artyom', 90, 6, 'beautiful and clever boy'),
  new Product('sasha', 2, 1, 'beautiful and clever boy'),
  new Product('lesha', 1, 2, 'beautiful and clever boy'),
  new Product('vanya', 3, 1, 'beautiful and clever boy'),
  new Product('pety', 3, 3, 'beautiful and clever boy'),
];

// Коллекция операций над числовыми значениями
const numberMap = new Map([
  ['=', (a, b) => a === b],
  ['<', (a, b) => a < b],
  ['>', (a, b) => a > b],
  ['<=', (a, b) => a <= b],
  ['>=', (a, b) => a >= b],
]);

// Коллекция операций над строковыми значениями
const stringMap = new Map([
  ['contains', (initString, subString) => initString.includes(subString)],
  ['starts', (initString, subString) => initString.startsWith(subString)],
  ['ends', (initString, subString) => initString.endsWith(subString)],
]);

const method = (str) => {
  const result = []; // Результирующий массив
  const string = str.replace(/-/g, ' ');
  const conditionsArray = string.split('&'); // Разбиваем строку с условиями на массив одиночных условий

  for (let element of sourceArray) {
    // Берем каждый элемент(объект) исходного массива объектов класса
    let count = 0; // Счётчик, по которому будем смотреть, добавлять или нет текущий обьект в результирующий массив

    for (let key in element) {
      // Проходим по каждому свойству обьекта
      for (let oneCondition of conditionsArray) {
        // Находим нужное нам свойство обьекта в соответсвии с именем условия, если такое имеется
        let arrayOneCondition = oneCondition.split(' ');

        if (arrayOneCondition.length === 2) {
          // Случай условий для числовых значений
          let field = arrayOneCondition[0];
          let operation = arrayOneCondition[1].slice(0, 2);
          let value = Number(arrayOneCondition[1].slice(2));

          if (!numberMap.has(operation)) {
            // если символ операции над числом единичный
            operation = arrayOneCondition[1].slice(0, 1);
            value = Number(arrayOneCondition[1].slice(1));
          }

          switch (
            key // Ищем соответствия между ключом свойста и именем условия
          ) {
            case field:
              //  Если условие проходит успешно -- увеличиваем значение счётчика
              if (numberMap.get(operation)(element[key], value)) {
                count++;
              }
              break;
            default: // В остальных случаях идём на следующую итерацию
              break;
          }
        }

        if (arrayOneCondition.length === 3) {
          //  Случай условий для строковых значений
          let [field, cond, value] = arrayOneCondition;

          switch (key) {
            case field:
              if (stringMap.get(cond)(element[key], value)) {
                count++;
              }
              break;
            default:
              break;
          }
        }
      }
    }
    if (count === conditionsArray.length) {
      // Если все условия из входной строки прошли успешно (значение счётчика = количеству успешных условий = длинне массива условий)
      // тогда добавляем объект в результирующий массив и обнуляем счётчик
      result.push(element);
      count = 0;
    }
  }
  return result; // Возвращаем результат
};

// console.log(
//   method('name-contains-a&price-=10&quantity->=7&description-starts-b')
// );
console.log(method('name-contains-a&price->3'));
//method('price-=3&quantity->=4');
