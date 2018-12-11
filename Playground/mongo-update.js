const {MongoClient,ObjectId} = require("mongodb")
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
  const db = client.db("TodoApp")
  if (err){
    return console.log("Unable to connect")
  }
  console.log("Connected to DBServer")
  db.collection("Users").findOneAndUpdate(
    {
      name: "Roopesh"
    },
    {
      $set:{
        name: "Roopesh"
      },
      $inc:{
        age: -1
      }
    },
    {
      returnNewDocument: true
    }
  ).then((result)=>{
    console.log(result)
  })
})
