const socket = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');
let users = [];

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, './index.html');
    const readStream = fs.createReadStream(indexPath);
    
    readStream.pipe(res);
});
const io = socket(server);

io.on('connection', client => {
    let count = users.length + 1;
    let newUser = client.id.slice(0, 4)
    users.push(newUser);
    console.log(users.length);

    client.broadcast.emit('connectUser', newUser);
    client.emit('connectUser', newUser);
 
    client.broadcast.emit('countUser', count);
    client.emit('countUser', count);
   
    client.on('client-msg', (data) => {
       
        let  {message, user} = data;
        let answer = {message: message, user: user || client.id.slice(0, 4)}
        
        client.broadcast.emit('srv-msg', answer);
        client.emit('srv-msg', {message: message, user: 'me'});
    });
    client.on('disconnect', () => {
        users.pop(newUser)
        console.log('dis',count)
        count = users.length;
        io.emit('countUser', count );
        io.emit('disconnectUser', newUser)
         
    })
});

server.listen(5555);
