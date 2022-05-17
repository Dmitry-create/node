const Emitter = require('events')

//02-12-05-2022

let date = process.argv[2];
const emitter = new Emitter();
const regexp = /\d\d-\d\d-\d\d-\d\d\d\d$/;

emitter.on('timer', (result) => console.log(result));

function userDate(date) {
    let hour = date.slice(0, 2);
    let day = date.slice(3, 5);
    let mounth = date.slice(6, 8) - 1;
    let year = date.slice(-4);
   
    return new Date(year, mounth , day, hour);
} 


let defftime = () =>{
    let deadline = userDate(date) - new Date();
    const days = deadline > 0 ? Math.floor(deadline / 1000 / 60 / 60 / 24) : 0;
    const hours = deadline > 0 ? Math.floor(deadline / 1000 / 60 / 60) % 24 : 0;
    const minutes = deadline > 0 ? Math.floor(deadline / 1000 / 60) % 60 : 0;
    const seconds = deadline > 0 ? Math.floor(deadline / 1000) % 60 : 0;

    return (`осталось ${days} дней ${hours} часов ${minutes} минут и ${seconds} секунд`)
}


if (regexp.test(date)) {
    let timerTick = setInterval(() => {
        if(userDate(date) <= new Date){
            emitter.emit('timer', 'end time');
            clearInterval(timerTick);
        } else{
            emitter.emit('timer', defftime());
        }
    }, 1000);
} else {
    emitter.emit('timer', 'not condition, оnly numbers hh-dd-mm-yyyy');
        
}

