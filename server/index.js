const express = require("express");

const path = require('path');

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());
app.use(express.static(path.join(__dirname + "/public")))
  
mongoose.connect("mongodb+srv://admin-pete:<password>@cluster0.rmzh4kn.mongodb.net/?retryWrites=true&w=majority");
const todoSchema = {
    title:String,
    content:String
};
const Todo = mongoose.model("Todo",todoSchema);

app.get("/", (req, res)=>{
    res.send("This is the root of the page");
});

app.get("/api", (req,res)=>{
    Todo.find((err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(result);
        }
    });
});

app.post("/api", (req, res)=>{
    const todoItem = new Todo({
        title: req.body.title,
        content: req.body.content
    });
    todoItem.save();
});

app.get("/api/delete", (req, res)=>{
    Todo.find((err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(result);
        }
    });
});


app.post("/api/delete", (req, res)=>{
    const deleteId = req.body;
    Todo.deleteOne({_id:deleteId._id},(err)=>{
        if(err){
            console.log(err);
        }
    });
})

app.listen(process.env.PORT || 5000, ()=>{
    console.log("server is up on port 5000");
});