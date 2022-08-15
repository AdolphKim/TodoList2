const todoForm = document.querySelector("#todoForm");
const todoInput = todoForm.querySelector("#todoInput");
const todoButton = todoForm.querySelector("#todoButton");
const todoListArray = document.querySelector(".todoListArray");
const clearButton = document.querySelector("#clearButton");
const guideText = document.querySelector(".guideText")
const TODOLIST_KEY = "todoList";
const CHECKED_CLASS = "checked";
const UNCHECKED_CLASS = "none";
const progressBar = document.querySelector(".todoProgressBar_completion");
const progressBarBox =document.querySelector(".todoProgressBar");
var progressValue  = 0;
function todoFormSubmit(event){
    event.preventDefault();
    const textValue = todoInput.value;
    todoInput.value = "";
    const date = new Date();
    const todoKey = date.getTime();
    printTodoList(textValue,todoKey);
    savedTodo(textValue,todoKey);
}

function savedTodo(textValue,todoKey){
    if(localStorage.getItem(TODOLIST_KEY)){
        todoArr = JSON.parse(localStorage.getItem(TODOLIST_KEY));
    }
    else{
        todoArr = [];
    }
    todoArr.push({todokey : todoKey ,  text:textValue , checked : "none"});
    localStorage.setItem(TODOLIST_KEY,JSON.stringify(todoArr));
}

function handleRemoveTodo(todoID){
    const index = findByID(todoID)
    todoArr.splice(index,1);
    localStorage.setItem(TODOLIST_KEY,JSON.stringify(todoArr));
    if(todoArr.length == 0){
        guideText.classList.remove(HIDDEN_CLASS);
    }
}
function printTodoList(textValue,todoKey,checked){
    const newTodo = document.createElement("li");
    newTodo.id = todoKey;
    const removeButton = document.createElement("button");
    removeButton.append("X");
    const checkButton = document.createElement("button");
    checkButton.append("C");
    newTodo.append(textValue);
    const buttonDiv = document.createElement("div");
    buttonDiv.append(checkButton);
    buttonDiv.append(removeButton);
    newTodo.append(buttonDiv);
    todoListArray.append(newTodo);
    removeButton.addEventListener("click",removeButtonClicked);
    checkButton.addEventListener("click",checkButtonClicked);
    handleProgressBar(progressValue);
    if(checked == CHECKED_CLASS){
        checkButtonClicked();
    }
    function checkButtonClicked(){
        const checkedTodo = checkButton.parentElement.parentElement;
        checkedTodo.classList.toggle(CHECKED_CLASS);
        isChecked(checkedTodo);
        
        handleProgressBar(progressValue);
    }
    function removeButtonClicked(){
        const removeTodo = removeButton.parentElement.parentElement;
        const removeID = removeTodo.id;
        if(removeTodo.classList.contains(CHECKED_CLASS)){
            progressValue  = progressValue -1;
        }
        removeTodo.remove();
        handleRemoveTodo(removeID);
        handleProgressBar(progressValue);
    }
    if(!guideText.classList.contains(HIDDEN_CLASS)){
        guideText.classList.add(HIDDEN_CLASS);
    }
}

if(localStorage.getItem(TODOLIST_KEY))
{
    todoArr = JSON.parse(localStorage.getItem(TODOLIST_KEY));
    todoArr.forEach(element => printTodoList(element.text,element.todokey,element.checked));
}

function handelCheckTodo(todoID,CHECKEDBOOL) {
    const index = findByID(todoID);
    todoArr[index].checked = CHECKEDBOOL;
    localStorage.setItem(TODOLIST_KEY,JSON.stringify(todoArr));
}
function handelClearButton(){
    localStorage.setItem(TODOLIST_KEY,"[]");
    const todos = todoListArray.getElementsByTagName('li');
    for(i = todos.length ; i -- ; i > 0)
    {
        todos[i].remove();
    }
    progressValue = 0;
    handleProgressBar(progressValue);
    guideText.classList.remove(HIDDEN_CLASS);
}
function findByID(todoID){
    var findIndex = 0;
    var index = 0;
    todoArr = JSON.parse(localStorage.getItem(TODOLIST_KEY));
    todoArr.forEach(element => {
        
        if(element.todokey == todoID){
            findIndex = index;
        }
        index = index + 1;
    });
    return findIndex;
}
function handleProgressBar(value){
    const maxValue = todoListArray.children.length - 1;
    if(value > 0){
        progressBar.style.width = JSON.stringify(value/maxValue * 100) + "%";
    }
    else{
        progressBar.style.width =  "0%"
    }
}

function isChecked(todo){
    if(todo.classList.contains(CHECKED_CLASS)){
        progressValue = progressValue + 1;
        handelCheckTodo(todo.id,CHECKED_CLASS)
    }
    else{
        progressValue = progressValue - 1;
        handelCheckTodo(todo.id,UNCHECKED_CLASS);
    }
}
todoForm.addEventListener("submit",todoFormSubmit);
clearButton.addEventListener("click",handelClearButton);