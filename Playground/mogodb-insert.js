const {MongoClient,ObjectID} = require("mongodb")
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
  const db = client.db("TodoApp")
  if (err){
    return console.log("Unable to connect")
  }
  console.log("Connected to DBServer")
  db.collection("Users").insertOne({
    name: "Roopesh",
    age: 24,
    location: "Tirupati"
  },(err,result)=>{
    if (err){
      return console.log("Unable to insert collection")
    }
    console.log(JSON.stringify(result.ops,undefined,2))
  })
  client.close()
})
