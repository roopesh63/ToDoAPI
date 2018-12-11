const {MongoClient,ObjectId} = require("mongodb")
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
  const db = client.db("TodoApp")
  if (err){
    return console.log("Unable to connect")
  }
  console.log("Connected to DBServer")
  // db.collection("Users").deleteMany({name: "Roopesh"}).then((result)=>{
  //   console.log("deleted successfully",result);
  // })
  // db.collection("Users").findOneAndDelete({_id: new ObjectId("5c0f96f54388cb1f70eee2ab")}).then((result)=>{
  //   console.log("deleted the document",result)
  // })
  db.collection("Users").deleteOne({name: "Warner"}).then((result)=>{
    console.log(result)
  })
})
