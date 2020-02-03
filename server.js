import express from 'express';
import http from 'http';

const app = express()

app.use(express.static('public'))

http.createServer(app).listen(3000, () => 
    console.log('O servidor está rodando em localhost:3000')
    )
