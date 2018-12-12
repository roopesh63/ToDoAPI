//const MongoClient = require("mongodb").MongoClient
//destructuring
const {MongoClient,ObjectID} = require("mongodb")
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
  const db = client.db("TodoApp")
  if (err){
    return console.log("Unable to connect")
  }
  console.log("Connected to DBServer")
  db.collection("Users").find({name:"Roopesh"}).count().then((count)=>{
    console.log(count)
  },(err)=>{
    console.log("Unable to fetch number",err)
  })
})
