// Initialize Firebase
var config = {
    apiKey: "AIzaSyA041xWXU2LT0Gt7Fu-af7freXhKGw8rXc",
    authDomain: "crud-9c042.firebaseapp.com",
    databaseURL: "https://crud-9c042.firebaseio.com",
    projectId: "crud-9c042",
    storageBucket: "crud-9c042.appspot.com",
    messagingSenderId: "986872772590"
  };
  firebase.initializeApp(config);

  var d = new Date()
  var t = d.getTime()
  var counter = t
  document.getElementById("form").addEventListener('submit', e =>{

      var task = document.getElementById("task").value
      var description = document.getElementById("description").value
      e.preventDefault()
      console.log(task+" "+description)
      createTask(task,description)
      form.reset()
  })

  function createTask(task,description){
    console.log(counter)
     counter+=1
     console.log(counter)
     var task = {
         id:counter,
         task,
         description
     }
     let db = firebase.database().ref("task/"+counter)
     db.set(task)
     document.getElementById("CardSection").innerHTML="";
     readTask();
  }


  function readTask() {
    var task = firebase.database().ref("task/")
    task.on("child_added", data => {
        var taskValue = data.val()
        console.log(taskValue)

        document.getElementById("CardSection").innerHTML+=`
        <div style="margin-bottom : 0.5em" class="card">
        <div class="card-body">
        <h5 class="card-title">${taskValue.task}</h5>
        <p class="card-text">${taskValue.description}</p>
        <button type="submit" style="color:white" class="btn btn-warning" 
        onclick="updateTask(${taskValue.id} , '${taskValue.task}', '${taskValue.description}')"
        >Edit Task</button>
        <button  type="submit" class="btn btn-danger" 
        onclick="deleteTask(${taskValue.id})"
        ><i class="far fa-trash-alt"></i>Delete Task</button>
        </div>
        </div> 
        `
    })
}


function reset(){
    document.getElementById("firstSection").innerHTML=`
    <form class="border p-4 mb-4" id="form" >
    <div class="form-group">
        <label>Task</label>
        <input type="text" class="form-control" id="task" placeholder="Enter Task" >
    </div>

    <div class="form-group">
         <label>Description</label>
         <input type="text" class="form-control" id="description" placeholder="Description" >
    </div>

    <button type="submit" id="button1" class="btn btn-primary">Add Task</button>
    <button style="display: none"  id="button2" class="btn btn-success">Update Task</button>
    <button style="display: none"  id="button3" class="btn btn-danger">Cancel Task</button>

    </form>
     ` ;
     
     document.getElementById("form").addEventListener('submit', e =>{

        var task = document.getElementById("task").value
        var description = document.getElementById("description").value
        e.preventDefault()
        console.log(task+" "+description)
        createTask(task,description)
        form.reset()
    })
}


function updateTask(id,name,description){
  document.getElementById("firstSection").innerHTML=`
  <form class="border p-4 mb-4" id="form2" >
    <div class="form-group">
        <label>Task</label>
        <input type="text" class="form-control" id="task" placeholder="Enter Task" >
    </div>

    <div class="form-group">
         <label>Description</label>
         <input type="text" class="form-control" id="description" placeholder="Description" >
    </div>

    <button style="display: none" id="button1" class="btn btn-primary">Add Task</button>
    <button typ="submit" style="display: inline-block"  id="button2" class="btn btn-success">Update Task</button>
    <button style="display: inline-block"  id="button3" class="btn btn-danger">Cancel Task</button>

    </form>
  `;
  document.getElementById("form2").addEventListener("submit", e => {
      e.preventDefault()
  })
  document.getElementById("button3").addEventListener("click", e=>{
    reset()
  })

  document.getElementById("button2").addEventListener("click", e=>{
    updateTask2(id, document.getElementById("task").value ,document.getElementById("description").value)
  })
  document.getElementById("task").value = name
  document.getElementById("description").value = description
}

function updateTask2(id,name,description){
   var updatedTask = {
       id,
       task : name,
       description
   }
   let db = firebase.database().ref("task/"+id)
   db.set(updatedTask)
   document.getElementById("CardSection").innerHTML="";
   readTask()
   reset()
}

function deleteTask(id){
    var task = firebase.database().ref("task/"+id)
    task.remove()
    reset()
    document.getElementById("CardSection").innerHTML="";
    readTask()
}