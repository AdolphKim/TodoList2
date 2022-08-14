const loginForm = document.querySelector("#loginForm");
const loginInput = loginForm.querySelector("#loginInput");
const loginButton = loginForm.querySelector("#loginButton");
const greeting = document.querySelector("#greeting");
const movePagesButton = document.querySelector(".movePages");
const clockBox = document.querySelector(".clockBox");
const quoteBox = document.querySelector(".quoteBox");
var index = 0;

const HIDDEN_CLASS = "hidden";
const USERNAME_KEY = "username";
const savedUser = localStorage.getItem(USERNAME_KEY)
let userName;

function greetingUser(userName){
    loginForm.classList.add(HIDDEN_CLASS);
    greeting.innerText = `${userName}님 반갑습니다!`;
    greeting.classList.remove(HIDDEN_CLASS);
}
function handelLoginSubmit(event){
    event.preventDefault();
    userName = loginInput.value;
    greetingUser(userName);
    localStorage.setItem(USERNAME_KEY,userName);
}

if(savedUser)
{
    greetingUser(savedUser);
}
loginForm.addEventListener("submit",handelLoginSubmit);

function handelMovePages(){
    if(index == 0){
        clockBox.style.display = "none";
        quoteBox.style.display = "none";
        greeting.style.display = "inline";
        index ++;
    }
    else if(index == 1){
        clockBox.style.display = "none";
        quoteBox.style.display = "inline";
        greeting.style.display = "none";
        index ++;
    }
    else if(index == 2){
        clockBox.style.display = "inline";
        quoteBox.style.display = "none";
        greeting.style.display = "none";
        index ++;
    }
    else{
        index = 0;
        handelMovePages();
    }
}
movePagesButton.addEventListener("click",handelMovePages);