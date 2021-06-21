const express = require('express')
const routes = express.Router()
const DashboardController = require('./controllers/Dashboard')
const DataBase = require('./models/DataModel')

routes.get("/", (req, res) => DashboardController.index(req, res))
routes.post("/", (req,res) => DashboardController.save(req,res))
routes.post("/delete/:id", (req,res) => DashboardController.delete(req,res))



module.exports = routes