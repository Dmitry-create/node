const readline = require('readline');
const fs = require('fs');
const lineReader = require('line-reader'); 
const pathAccess = './access.log';

let ipAdress1 = '89.123.1.41';
let ipAdress2 = '34.48.240.111';
 
lineReader.eachLine(pathAccess, function(line) { 

if (line.includes(ipAdress1)){ 
    fs.writeFile(`./${ipAdress1}_requests.txt`, line, { flag: 'a' }, (err)=> console.log(err))
    fs.writeFile(`./${ipAdress1}_requests.txt`, '\n', { flag: 'a' }, (err)=> console.log(err))
} else if (line.includes(ipAdress2)){
    fs.writeFile(`./${ipAdress2}_requests.txt`, line, { flag: 'a' }, (err)=> console.log(err))
    fs.writeFile(`./${ipAdress2}_requests.txt`, '\n', { flag: 'a' }, (err)=> console.log(err))
    }

}); 


