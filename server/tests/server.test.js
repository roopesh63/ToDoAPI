const expect = require("expect")
const request = require("supertest")

const {app} = require("./server/server")
const {Todo} = require("./server/models/todo")
 beforeEach((done)=>{
   Todo.remove({}).then(()=>{done()})
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
       Todo.find().then((todos)=>{
         expect(todos.length).toBe(1)
         expect(todos[0].text).toBe(text)
         done()
       }).catch((e)=>done(e))
     })
   })
   // it("should not post data in case of errors",(done)=>{
   //   request(app).
   //   post("/todos").
   //   send({}).
   //   expect(400).
   //   expect()
   })

 })
