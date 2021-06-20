const express = require('express')
const server = express()
const path = require('path')
const routes = require('./routes')
const helmet = require('helmet')

server.set("view engine", 'ejs')
server.set("views", path.join(__dirname, "views"))

server.use(helmet())
server.use(express.static("public"))
server.use(express.urlencoded({extended: true}))
server.use(routes)


server.listen(3000, () => console.log("O servidor esta rodando"))