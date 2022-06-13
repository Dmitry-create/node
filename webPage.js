const yargs = require('yargs');
const path = require('path');
const fs = require('fs');
const http = require('http')

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

    choiceDir = options.p;

(async () =>{
    const isFile = (path) => fs.lstatSync(path).isFile()
    

    http.createServer((req, res) => {
        const allPath = path.join(choiceDir, req.url);
        console.log(allPath);
        if (!fs.existsSync(allPath)) return res.end('error');
            
        if (isFile(allPath)) {
            
            const readFile = fs.createReadStream(allPath);
            readFile.pipe(res)
            return res.end;
        }
        let list = '';
        const urlParams = req.url.match(/[\d\w\.]+/gi);
console.log(urlParams);
        if (urlParams) {
            urlParams.pop();
            const prevUrl = urlParams.join('/');
            list = urlParams.length ? `<li><a href="/${prevUrl}">..</a></li>` : '<li><a href="/">..</a></li>';
        }
        fs.readdir(allPath, (err, files) => {
            if (err)
            console.log(err);
            else {
            files.forEach(file => { 
                let filePath = path.join(req.url, file);
                list += `<li><a href="${filePath}">${file}</a></li>`
                })
            }
            const content = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8').replace('links', list);
            choiceDir = process.cwd();
            return res.end(content);
        })
        
    }).listen(5550)
})()

    