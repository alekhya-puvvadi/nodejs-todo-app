const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

let taskStorage = [];

// Home Page
app.get("/", (req, res) => {

let listHTML = taskStorage
.map((task, index) => `
<li>
${task}
<a href="/delete/${index}" style="color:red;">Delete</a>
</li>
`)
.join("");

res.send(`
<html>

<head>
<title>Todo App</title>

<style>

body{
font-family: Arial;
background:#f2f2f2;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
}

.container{
background:white;
padding:30px;
border-radius:10px;
box-shadow:0 0 10px rgba(0,0,0,0.1);
width:300px;
}

h1{
text-align:center;
}

input{
width:70%;
padding:8px;
}

button{
padding:8px;
background:#007bff;
color:white;
border:none;
cursor:pointer;
}

ul{
margin-top:20px;
}

li{
margin-bottom:10px;
}

</style>

</head>

<body>

<div class="container">

<h1>My Todo List</h1>

<form action="/add-task" method="POST">

<input type="text" name="taskValue" placeholder="Enter task" required>

<button type="submit">Add</button>

</form>

<ul>

${listHTML}

</ul>

</div>

</body>

</html>
`);
});

// Add Task
app.post("/add-task", (req, res) => {

let newTask = req.body.taskValue;

taskStorage.push(newTask);

res.redirect("/");

});

// Delete Task
app.get("/delete/:index", (req, res) => {

let taskIndex = req.params.index;

taskStorage.splice(taskIndex, 1);

res.redirect("/");

});

app.listen(3000, () => {
console.log("Server running at http://localhost:3000");
});