import 'reflect-metadata'
import './data'

const express = require('express')
const server = express()
const path = require('path')
const routes = require('./routes')

server.use(express.json())
server.set("view engine", 'ejs')
server.set("views", path.join(__dirname, "views"))

server.use(express.static("public"))
server.use(express.urlencoded({extended: true}))
server.use(routes)


server.listen(3001, () => console.log("O servidor esta rodando"))