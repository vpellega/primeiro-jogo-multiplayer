import express from 'express';
import http from 'http';
import socketio from 'socket.io'
import createGame from '../public/js/game'

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static('public'))

const game = createGame()
game.subscribe((command) => {
    console.log(`Emitting ${command.type} => ${command.playerId}`)
    io.emit(command.type, command)
})

server.listen(3002, console.log('Server it´s running...'))
io.on('connection', socket => {
    const playerId = socket.id
    console.log(`Player connected: ${socket.id}`)

    game.addPlayer({ playerId })
    
    io.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({playerId})
        console.log(`Player disconnected: ${playerId}`)
    })
})
