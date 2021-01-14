var tasks = []
var taskId = 1
var allData = [{name:"None", id:0, todo:[]}]
var allItems = []
var currentTaskId = 0
const listsContainer = document.querySelector('[data-lists]')

//saves allData to localStorage
var saveMaster = function(){
  localStorage.setItem("master", JSON.stringify(allData))
}

//saves current taskId to localStorage
var saveTaskId = function(){
  localStorage.setItem("taskId", taskId)
}

//clears the screen of todos
function clear(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

//create the necessary todos for the specified task
function render(allItems){
  for(k = 0; k < allItems.length; k++){
    var text = document.createTextNode(allItems[k])
    var newItem = document.createElement('ol')
    newItem.appendChild(text)
    document.getElementById('todoList').appendChild(newItem)
    //create checkboxes
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u2611");
    span.className = "close";
    span.appendChild(txt);
    newItem.appendChild(span);
    //deletes the todo if the checkmark is clicked
    span.onclick = function(){
      textToRemove = this.parentElement.innerText.slice(0, -1)
      allItems.splice(allItems.indexOf(textToRemove), 1)
      this.parentElement.remove()
      //save on delete
      saveMaster()
    }
  }
}

//prompts the user to input a name for the task if "Add Tasks" is clicked
var promptTask = function(){
  var task = prompt("Please enter your task's name: ");
  //checks if input is not a previously submitted one and if input is not all whitespace
  if(task != null && !tasks.includes(task) && task.trim().length != 0){
    //creates task
    var newOption = document.createElement('option');
    newOption.id = taskId
    newOption.appendChild(document.createTextNode(task));
    document.getElementById("taskList").appendChild(newOption); 
    allData.push({name: task, id: taskId, todo: []})
    tasks.push(task)
    //increments taskId for next task
    taskId++
    //saves changes
    saveMaster()
    saveTaskId()
  }
}

//deletes the last task if "Delete Last Task" is clicked
var deleteLastTask = function(){
  //checks if there are tasks to be deleted (cannot delete "None" task)
  if(tasks.length > 1){
    allData.splice(-1, 1)
    tasks.splice(-1, 1)
    document.getElementsByTagName('option')[document.getElementsByTagName('option').length - 1].remove()  
    taskId--
    clear(listsContainer)
    //save changes
    saveMaster()
    saveTaskId()
  }
}

//shows the todos for the new task specified
var changeTask = function(){
  currentTaskId = document.getElementsByTagName("option")[document.getElementById("taskList").selectedIndex].id
  allItems = allData[currentTaskId].todo
  clear(listsContainer)
  render(allItems)
}

//if there is a localStorage made, load saved settings
if(localStorage["master"]){
  allData = JSON.parse(localStorage.getItem("master"))
  
  for(j = 0; j < allData.length; j++){
    //import tasks to local variable
    tasks.push(allData[j].name)

    //write saved tasks to html
    var newOption = document.createElement('option');
    newOption.id = allData[j].id
    newOption.appendChild(document.createTextNode(allData[j].name));
    document.getElementById("taskList").appendChild(newOption); 
  }

  //maintain saved taskId
  taskId = JSON.parse(localStorage.getItem("taskId"))
}
else{
  //if no localStorage, create None task
  var noneOption = document.createElement('option');
  noneOption.id = 0
  noneOption.appendChild(document.createTextNode("Tasks:"));
  document.getElementById("taskList").appendChild(noneOption); 
  //save taskId to localStorage
  saveTaskId()
}

//add input handlers
//global key listener to allow keyboard only operation
document.addEventListener('keydown', (e) => {
  if (e.code === "ArrowUp"){
    //prevents double scrolling
    e.preventDefault()
    if(document.getElementById("taskList").selectedIndex != 0){
      document.getElementById("taskList").selectedIndex -= 1
      changeTask()
    }
    // wrap to last element
    else{
      document.getElementById("taskList").selectedIndex = tasks.length - 1
      changeTask()
    }
  }
  if (e.code === "ArrowDown"){
    //prevents double scrolling
    e.preventDefault()
    if(document.getElementById("taskList").selectedIndex < tasks.length - 1){
      document.getElementById("taskList").selectedIndex += 1
      changeTask()
    }
    // wrap to first element
    else {
      document.getElementById("taskList").selectedIndex = 0
      changeTask()
    }
  }  

  //
  if(document.activeElement != document.getElementById("todoInput")){
    if(e.code === "Enter"){
      document.getElementById("todoInput").focus()
    }
    if(e.code === "ArrowLeft"){
      promptTask()
    }
    if(e.code === "ArrowRight"){
      if(confirm("Are you sure you want to delete this last task?") == true){
        deleteLastTask()
      }
    }
  }
  // unfocus todoInput on esc
  if(document.activeElement == document.getElementById("todoInput")){
    if(e.code === "Escape"){
      document.getElementById("todoInput").blur()
    }
  }
});

document.getElementById("todoInput").addEventListener("keypress", addTodo);
document.getElementById("addButton").addEventListener("click", promptTask)
document.getElementById("deleteButton").addEventListener("click", 
function(){
  if(confirm("Are you sure you want to delete this last task?") == true){
    deleteLastTask()
  }})
document.getElementById("taskList").addEventListener("change", changeTask)

//adds a todo if enter is pressed in the todoInput box
function addTodo(e) {
  //if enter is pressed
  if(e.code === "Enter"){
    //prevent default form submitting action
    e.preventDefault(); 
    //grabs the input value
    var str = document.getElementById("todoInput").value
    //deletes the input from the box
    document.getElementById("todoInput").value = ""
    //only execute if not working on "None"
    if(currentTaskId != 0){
      //checks if input is not all whitespace and it has not been entered before
      if(str != null && str.trim().length != 0 && !allItems.includes(str)){
        //push value to allItems
        allItems.push(str)
        //create todo
        var text = document.createTextNode(str)
        var newItem = document.createElement('ol')
        newItem.appendChild(text)
        document.getElementById('todoList').appendChild(newItem)
        allData[currentTaskId].todo = allItems
        //create checkboxes
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u2611");
        span.className = "close";
        span.appendChild(txt);
        newItem.appendChild(span);
        //deletes the todo if the checkmark is clicked
        span.onclick = function(){
          textToRemove = this.parentElement.innerText.slice(0, -1)
          allItems.splice(allItems.indexOf(textToRemove), 1)
          this.parentElement.remove()
          //save changes
          saveMaster()
        }        
        saveMaster()
      }  
    }   
  }
}