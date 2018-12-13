const expect = require("expect")
const request = require("supertest")
const {ObjectID} = require("mongodb")

const {app} = require("./../server")
const {Todo} = require("./../models/todo")
const todos = [{
  _id: new ObjectID(),
  text: "first",
  completed: true,
  completedAt: 1234
},
{
  _id: new ObjectID(),
  text: "Second"
}]
 beforeEach((done)=>{
   Todo.remove({}).then(()=>{
     return Todo.insertMany(todos)
   }).then(()=>{done()})
 })
 describe("POST/todos",()=>{
   it("should post data to todos",(done)=>{
     var text = "post to todos"
     request(app).
     post("/todos").
     send({text}).
     expect(200).
     expect((res)=>{
       expect(res.body.text).toBe(text)
     }).
     end((err,res)=>{
       if (err){
         return console.log(err)
       }
       Todo.find({text}).then((todos)=>{
         expect(todos.length).toBe(1)
         expect(todos[0].text).toBe(text)
         done()
       }).catch((e)=>done(e))
     })
   })
   it("should not post data in case of errors",(done)=>{
     request(app).
     post("/todos").
     send({}).
     expect(400).
     end((err,res)=>{
       if(err){
         return done(err)
       }
       Todo.find().then((todos)=>{
         expect(todos.length).toBe(2)
         done()
       }).catch((e)=>done(e))
     })
   })
 })
 describe("Get-Todos",()=>{
   it("should get all todos",(done)=>{
     request(app).
     get("/todos").
     expect(200).
     expect((res)=>{
       expect(res.body.todos.length).toBe(2)
     }).end(done)
   })
 })
 describe("GetById",()=>{
   it("should return data by id",(done)=>{
   request(app).
   get(`/todo/${todos[0]._id.toHexString()}`).
   expect(200).
   expect((res)=>{
     expect(res.body.text).toBe(todos[0].text)
   }).end(done)
 })
 it("should return 404 if not found",(done)=>{
   var hexId = new ObjectID().toHexString()
   request(app).
   get(`/todo/${hexId}`).
   expect(404).end(done)
 })
 it("should return error",(done)=>{
   request(app).
   get("/todo/123a").
   expect(404).end(done)
  })
 })
describe("Delete Todo",()=>{
  it("should delete document by Id",(done)=>{
    var hexId = todos[1]._id.toHexString()
    request(app).
    delete(`/todo/${hexId}`).
    expect(200).
    expect((res)=>{
      expect(res.body._id).toBe(hexId)
    }).
    end((err,res)=>{
      if(err){
        return done(err)
      }
        Todo.findById(hexId).then((res)=>{
          expect(res).toBeNull()
          done()
        }).catch((e)=>done(e))
    })
  })
  it("should return 404 if not found",(done)=>{
    var hexId = new ObjectID().toHexString()
    request(app).
    delete(`/todo/${hexId}`).
    expect(404).end(done)
  })
  it("should return error",(done)=>{
    request(app).
    delete("/todo/123a").
    expect(404).end(done)
   })
})
describe("Patch Work tests",()=>{
  it("should return true with updated text and time stamp",(done)=>{
    var hexId = todos[0]._id.toHexString()
    var text = "have a nice day"
    request(app).
    patch(`/todo/${hexId}`).
    send({
      completed: true,
      text
    }).
    expect(200).
    expect((result)=>{
      expect(result.body.text).toBe(text)
      expect(result.body.completed).toBe(true)
    }).end(done)
  })
  it("should return false with updated text and null",(done)=>{
    var hexId = todos[1]._id.toHexString()
    var text = "have a nice day!!!"
    request(app).
    patch(`/todo/${hexId}`).
    send({
      text
    }).
    expect(200).
    expect((result)=>{
      expect(result.body.text).toBe(text)
      expect(result.body.completed).toBe(false)
    }).end(done)
  })
})
