const fs = require('fs/promises');
const {lstatSync} = require('fs');
const inquirer = require('inquirer');
const yargs = require('yargs');
const path = require('path');
const readline = require('readline');
const lineReader = require('line-reader');


const options = yargs
    .usage("Usage: -p <path>")
    .option("p", 
            { 
                alias: "path", 
                describe: "Path to file", 
                type: "string", 
                default: process.cwd(),
                demandOption: true 
            })
    .argv;
let choiseDir = options.p

const pattern = yargs
    .usage("Usage: -P <Pattern>")
    .option("P", 
            { 
                alias: "Pattern", 
                describe: "pattern", 
                type: "string", 
                default: '',
                demandOption: false
            })
    .argv;


class ListItem {
    constructor(path, fileName) {
        this.path = path;
        this.fileName = fileName;
    }

    get isDir() {
        return lstatSync(this.path).isDirectory();
    }
}

const run = async () => {
    const list = await fs.readdir(choiseDir);
    

    const items = list.map(fileName =>
        new ListItem( path.join(choiseDir, fileName), fileName ));
    console.log(items)
    const item = await inquirer
        .prompt([
            {
                name: 'fileName',
                type: 'list',
                message: `Choose: ${choiseDir}`,
                choices: items.map(item => ({name: item.fileName, value: item})),
            }
        ])
        .then(answer => answer.fileName);

    if (item.isDir) {
        choiseDir = item.path;
        return await run();
    } else {
        const data = await fs.readFile(item.path, 'utf-8');

        if (pattern.P) {
            //console.log(pattern.P)
            //const regExp = new RegExp(options.P, 'igm');
            let result = data.match(pattern.P);
            console.log(`в позиции ${result.index} есть совпадение`)
            
        }
        else
            {
             console.log(data);
        }
    }
}

run();