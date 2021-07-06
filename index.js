const express = require("express");
const app = express();
const path = require("path");
app.set("views", path.join(__dirname, "/views"))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/asset'))



//connecting with mongoDB --------------------------------------------

const Todos = require("./model/todoModel");
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://nabarun:amikkr@cluster0.9yngi.mongodb.net/todosdb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((r) => {
        console.log("server is connected");
    })
    .catch((err) => {
        console.log(err);
    })

//restfull routs   -----------------------------------------

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res)=>{
    res.render("home.ejs");
})
app.get("/todos", (req, respon) => {
    Todos.find({}).then(res => {
        var todos = res;
        Todos.find({ done: true }).then(res => {
              var todosLength = todos.length;
            var doneTodoLength = res.length;
            respon.render("index.ejs", { todos, todosLength, doneTodoLength });
           
        })
    })
      
})
app.post("/todos", async(req, res) => {
    const newTodo = req.body; 
    await Todos.create(newTodo);
    res.redirect("/todos");
  
})
app.post("/patch", async(req, res) => {
    await Todos.findOneAndUpdate({ todoString:req.body.todoString }, { todoString:req.body.updateTodoString });
    res.redirect("/todos");
})
app.post("/delete", async(req, res) => {
    const name = req.body;
    await Todos.findOneAndDelete(name)
    res.redirect("/todos");
    console.log(name);
})
app.post("/done", async(req, res) =>{
    const doneUp = req.body;
   await Todos.findByIdAndUpdate(doneUp.id, { done: doneUp.done });
    res.redirect("/todos");
})
app.listen(1000, () => {
    console.log("listening on port 1000")
})
