const express = require('express')
const routes = express.Router()
const DashboardController = require('./controllers/Dashboard')


routes.get("/", (req, res) => DashboardController.show)
routes.post("/", (req,res) => DashboardController.save)
routes.delete("/delete/:id", DashboardController.delete)

module.exports = routes