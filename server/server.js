const express = require("express")
const bodyParser = require("body-parser")
const {ObjectID} = require("mongodb")
const {mongoose} = require("./db/mongoose")
const {Todo} = require("./models/todo")
const {User} = require("./models/user")
var port = process.env.port || 3000
var app = express()
app.use(bodyParser.json())
app.post("/todos",(req,res)=>{
  var todo = new Todo({
    text: req.body.text
  })
  todo.save().then((result)=>{
    res.send(result)
  },(e)=>{
    res.status(400).send(e)
  })
})
app.get("/todos",(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos})
  },(e)=>{
    res.status(400).send(e)
  })
})
app.get("/todo/:id",(req,res)=>{
  var id = req.params.id
  if (!ObjectID.isValid(id)){
    return res.status(404).send()
  }
  Todo.findById(id).then((result)=>{
    if(!result){
      return res.status(404).send()
    }
    res.send({result})
  },(e)=>{
    res.status(400).send(e)
  })
})
app.delete("/todo/:id",(req,res)=>{
  var id = req.params.id
  if (!ObjectID.isValid(id)){
    return res.status(404).send()
  }
  Todo.findByIdAndRemove(id).then((result)=>{
    if(!result){
      return res.status(404).send()
    }
    res.status(200).send(result)
  },(e)=>{
    res.status(400).send(e)
  })
})
app.listen(port,()=>{
  console.log(`server started on ${port}`)
})
module.exports = {app}
