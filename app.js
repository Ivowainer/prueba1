require('dotenv').config();

const express = require('express');
const { createServer } = require('http');
const {Server: IoServer} = require('socket.io');

const app = express();
const http = createServer(app);
const io = new IoServer(http);

const logger = require('morgan')

const router = require('./src/routes/index')
const errorHandler = require('./src/middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// TODO
app.set('view engine', 'ejs')
app.set('views', './views/pages')

const PORT = process.env.PORT || 8000
http.listen(PORT, () =>
    console.log('SERVER READY ON PORT: ', PORT)
)

app.get('/health', async(_req, res) => {
    res.status(200).json({
        env: process.env.ENVIROMENT || undefined,
        port: process.env.PORT || 8000
    })
})
app.use('/api', router)
app.use(errorHandler)
app.use(logger('dev'))

// TODO: 
app.get("/", (_req, res)=>{
    res.render("index")
})
const messages = [];

io.on('connection', socket => {
    console.log('Nuevo cliente conectado!, id:', socket.id);
    socket.emit('UPDATE_DATA', messages);
    socket.on('NEW_MESSAGE_CLI', data => {
        const messageData = {id: socket.id, content: data};
        messages.push(messageData);
        io.sockets.emit('NEW_MESSAGE', messageData);
    })
})

module.exports = app