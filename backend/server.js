import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io'; //replaces (import socketIo from 'socket.io')





dotenv.config()



connectDB()

const app = express()


app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running for Borsa')
})

app.use('/api/users', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/orders', orderRoutes)

const PORT = process.env.PORT || 5002
const serv = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

const httpServer = createServer();

const io = new Server(serv, { cors: { origin: 'http://localhost:3000' } });

/*const io = new socketio (httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000/",
    },
}) */

io.on("connection", (socket) => {
    console.log('connected to socket.io')

    socket.on('setup', (userData)=> {

        socket.join(userData._id)
        console.log(`setting up in ${userData._id}`)
        socket.emit('connected')

    })

    socket.on('join_room', (room)=> {

        socket.join(room)
        console.log(`Your room is up in ${room}`)
       

    })

    socket.on('new_message', (newMessageReceived)=> {

        var chat = newMessageReceived.chat

        if (!chat.users) {
            return console.log("chat.users not defined")
        }


       chat.users.forEach(user => {
        if(user._id == newMessageReceived.sender._id){
            return 
        } 

        socket.in(user._id).emit("message received", newMessageReceived )
       })

    })

   
})
