const timeText = document.querySelector("#clock");

clock();
timesUp = setInterval(clock,1000)

function clock(){
    const date = new Date();
    const hour = date.getHours().toString().padStart(2,'0');
    const min = date.getMinutes().toString().padStart(2,'0');
    const sec = date.getSeconds().toString().padStart(2,'0');
    timeText.innerText = `${hour}:${min}:${sec}`;
}