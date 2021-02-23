import "reflect-metadata"
import express, { response } from 'express'
import "./database"
let server = express()


server.get("/user", (require,response)=>{
   return response.json(
       {
           name:"Guilherme",
           email:"forestus7@gmail.com",
           password: "******",
           office:"Dev Junior Java"
       }
   ) 
})

server.post("/users/:id",(require,response)=>{
    return
})



server.listen(3333,() =>console.log("server on!"))