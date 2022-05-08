
const colors = require('colors/safe');

const min = +process.argv[2];
const max = +process.argv[3];
let count = 0;


function colorChange(i){
  let col = [
    colors.red(String(i)),
    colors.green(String(i)),
    colors.yellow(String(i))
  ];
//console.log(colors.black(count))
  return (count == 2)? col[count = 0]: col[++count]
}

function simplNum(num){
    for (let i = 2, max = Math.sqrt(num); i <= max; i++) {
        if (num % i === 0) {
          return false;
        };
      };
      return num > 1;
  };

let checkNumbers = (numbers) =>{
  if(numbers.length){
    return numbers.forEach(number => {
      console.log(colorChange(number))
    })
  }
  console.log(colors.red('not condition number'));
}
 
let allSimplNum = (i, num) => {
  let numbers = [];
  if (isNaN(i) || isNaN(num)) {
      return console.log('one of arguments is not a number!');
      
    };
      for (i; i <= num; i++) {
        if (simplNum(i)) {
          numbers.push(i)  
        }; 
      };
    checkNumbers(numbers)
  };

 allSimplNum(min, max);




