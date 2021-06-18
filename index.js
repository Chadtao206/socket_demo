const express = require("express");
const PORT = 3000;
const app = express();
const path = require('path');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const chatHistory = [];
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
const server = require('http').createServer(app);

const io = require('socket.io')(server);

io.on('connection', client => {
    client.on('event', data => {
        console.log(data)
    });
    client.on('disconnect', () => { });
    
    client.on('chat', data => {
        console.log(client.id)
        chatHistory.push(`${client.id} said ${data}`);
        io.emit('newChat',chatHistory);
    })
});
server.listen(PORT);