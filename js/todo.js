const todoForm = document.querySelector("#todoForm");
const todoInput = todoForm.querySelector("#todoInput");
const todoButton = todoForm.querySelector("#todoButton");
const todoListArray = document.querySelector(".todoListArray");
const clearButton = document.querySelector("#clearButton");
const guideText = document.querySelector(".guideText")
const TODOLIST_KEY = "todoList";
function todoFormSubmit(event){
    event.preventDefault();
    const textValue = todoInput.value;
    todoInput.value = "";
    const date = new Date();
    const removeKey = date.getTime();
    printTodoList(textValue,removeKey);
    savedTodo(textValue,removeKey);
}

function savedTodo(textValue,removeKey){
    if(localStorage.getItem(TODOLIST_KEY)){
        todoArr = JSON.parse(localStorage.getItem(TODOLIST_KEY));
    }
    else{
        todoArr = [];
    }
    todoArr.push({removekey : removeKey ,  text:textValue});
    localStorage.setItem(TODOLIST_KEY,JSON.stringify(todoArr));
}

function removeTodo(removeID){
    var removeIndex = 0;
    var index = 0;
    console.log(removeID);
    todoArr = JSON.parse(localStorage.getItem(TODOLIST_KEY));
    todoArr.forEach(element => {
        
        if(element.removekey == removeID){
            removeIndex = index;
            console.log(removeIndex);
        }
        index = index + 1;
    });
    todoArr.splice(removeIndex,1);
    console.log(todoArr);
    localStorage.setItem(TODOLIST_KEY,JSON.stringify(todoArr));
    if(todoArr.length == 0){
        guideText.classList.remove(HIDDEN_CLASS);
    }
}
function printTodoList(textValue,removeKey){
    const newTodo = document.createElement("li");
    newTodo.id = removeKey;
    const todoButton = document.createElement("button");
    todoButton.append("X");
    newTodo.append(textValue);
    newTodo.append(todoButton);
    todoListArray.append(newTodo);
    todoButton.addEventListener("click",todoButtonClicked);
    function todoButtonClicked(){
        const removeID = todoButton.parentElement.id;
        todoButton.parentElement.remove();
        removeTodo(removeID);
    }
    if(!guideText.classList.contains(HIDDEN_CLASS)){
        guideText.classList.add(HIDDEN_CLASS);
    }
}

if(localStorage.getItem(TODOLIST_KEY))
{
    todoArr = JSON.parse(localStorage.getItem(TODOLIST_KEY));
    todoArr.forEach(element => printTodoList(element.text,element.removekey));
}

function handelClearButton(){
    localStorage.setItem(TODOLIST_KEY,"[]");
    const todos = todoListArray.getElementsByTagName('li');
    for(i = todos.length ; i -- ; i > 0)
    {
        todos[i].remove();
    }
    guideText.classList.remove(HIDDEN_CLASS);
}
todoForm.addEventListener("submit",todoFormSubmit);
clearButton.addEventListener("click",handelClearButton);