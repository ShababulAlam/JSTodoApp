
const inputBox = document.querySelector("input");
const addBtn = document.querySelector("button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onblur = ()=> {
    addBtn.classList.remove("opacity-25");
}

inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; 
  if(userEnteredValue.trim() != 0){ //check whitspace
        addBtn.classList.add("opacity-25"); 
    }
  else{
        addBtn.classList.remove("opacity-25"); //unactive the add button
    }
}



    showTasks(); 
    addBtn.onclick = ()=>{ 
  let userEnteredValue = inputBox.value; 

  let getLocalStorageData = localStorage.getItem("New Todo"); //local storage access
  if(getLocalStorageData == null){ 
    listArray = []; //create new if empty
  }else{
    listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
  }
  
  
  
  
  
  listArray.push(userEnteredValue); //add new value from input
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming to string 
  showTasks(); 
  addBtn.classList.remove("opacity-25"); //unactive the add button once the task added
}

function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  
    if(getLocalStorageData == null){
    listArray = [];
  }
    
  else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  
  
  
  const pendingTasksNumb = document.querySelector(".pendingTasks");

  pendingTasksNumb.textContent = listArray.length; //adding how many task are used 

  if(listArray.length > 0){ 
    deleteAllBtn.classList.add("active"); //enable delete button if tasks found
  }else{
    deleteAllBtn.classList.remove("active"); //disbale delete button
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li class="block py-2 border-t shadow px-2 rounded flex justify-between">${element}<span class="icon ml-2 text-red-500 cursor-pointer" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  
  
  todoList.innerHTML = newLiTag; 
  inputBox.value = ""; 
}

function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //remove list alltogether 
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); //show tasks again
}

deleteAllBtn.onclick = ()=>{
  listArray = []; //clean array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //new key for local storage 
  showTasks(); //show tasts
}