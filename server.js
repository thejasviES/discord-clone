const express = require('express')
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')
const { connect } = require('http2')

require('dotenv').config()
const dotenv = require('dotenv').config()

const socketServer = require('./socketServer')

const authRoutes = require('./routes/authRoutes')
const friendInvitationRoutes = require('./routes/friendInvitationRoutes')

const PORT = process.env.API_PORT || 5003

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/friend-invitation', friendInvitationRoutes)
//write testing api
app.use('/api/test', (req, res) => {
    res.send('hello world')
})

const server = http.createServer(app)
socketServer.registerSocketServer(server)

mongoose
    .connect(process.env.DB)
    .then(() => {
        console.log('db connected')
        server.listen(PORT, () => {
            console.log(`server running at port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })
