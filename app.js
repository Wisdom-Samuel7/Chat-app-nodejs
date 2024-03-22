const { Socket } = require("dgram")
const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)


io.on("connection",(stream)=>{
    console.log(stream.id)
    
    stream.on("message",(message,room)=>{
        if(room===""){
            stream.broadcast.emit("server_return",message)
        }else{
            stream.to(room).emit("server_return",message)
        }
      stream.on("join-room",(room,cb)=>{
         stream.join(room)
        //  cb(`Joined ${room}`)
      })
    })


    // stream.on("join-room",(roomName,cb)=>{
    //     Socket.join(roomName)
    // })

})

app.set('view engine','ejs')

app.get("/",(req,res)=>{
   res.render("../views/home")
})



server.listen(4000,()=>{
    console.log('PORT 4000 runnning')
})