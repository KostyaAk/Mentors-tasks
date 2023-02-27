class Product {
  constructor(name, price, quantity, description) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }
}

let sourceArray = [
  new Product('kostya', 10, 5, 'beautiful and clever boy'),
  new Product('kost', 10, 7, 'beautiful and clever boy'),
  new Product('danila', 1, 7, 'beautiful and clever man'),
  new Product('daniil', 3, 9, 'beautiful and clever man'),
  // new Product('sergey', 60, 7, 'beautiful and clever boy'),
  // new Product('jenya', 70, 8, 'beautiful and clever boy'),
  // new Product('andrew', 80, 7, 'beautiful and clever boy'),
  // new Product('artyom', 90, 6, 'beautiful and clever boy'),
  // new Product('sasha', 2, 1, 'beautiful and clever boy'),
  // new Product('lesha', 1, 2, 'beautiful and clever boy'),
  // new Product('vanya', 3, 1, 'beautiful and clever boy'),
  // new Product('pety', 3, 3, 'beautiful and clever boy'),
];

const numberMap = new Map([
  ['=', (a, b) => a === b],
  ['<', (a, b) => a < b],
  ['>', (a, b) => a > b],
  ['<=', (a, b) => a <= b],
  ['>=', (a, b) => a >= b],
]);

const stringMap = new Map([
  ['contains', (initString, subString) => initString.includes(subString)],
  ['starts', (initString, subString) => initString.startsWith(subString)],
  ['ends', (initString, subString) => initString.endsWith(subString)],
]);

const method = (str) => {
  let result = [];
  let s = str.replace(/-/g, ' ');
  let conditionsArray = s.split('&');

  for (let elem of sourceArray) {
    let count = 0;
    // array массив  объектов класса
    for (let key in elem) {
      // отдельный объект класса
      for (let oneCondition of conditionsArray) {
        let arrayOneCondition = oneCondition.split(' ');

        if (arrayOneCondition.length == 2) {
          let field = arrayOneCondition[0];

          let operation = arrayOneCondition[1].slice(0, 1);
          let value = Number(arrayOneCondition[1].slice(1));

          switch (key) {
            case field:
              if (numberMap.get(operation)(elem[key], value)) {
                count++;
              }
              break;
            default:
              break;
          }
        }

        if (arrayOneCondition.length == 3) {
          let [field, cond, value] = arrayOneCondition;

          switch (key) {
            case field:
              if (stringMap.get(cond)(elem[key], value)) {
                count++;
              }
              break;
            default:
              break;
          }
        }
      }
    }
    if (count == conditionsArray.length) {
      result.push(elem);
      count = 0;
    }
  }
  return result;
};

console.log(
  method('name-contains-kos&price-=10&quantity->4&description-ends-boy')
);
//method('name-contains-kos&price-=3');
//method('price-=3&quantity->4');
