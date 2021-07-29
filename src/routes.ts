import Express from 'express'
import { TransactionController } from './controllers/TransactionController'

const routes = Express()
const transactionController = new TransactionController()

routes.get("/", transactionController.handleGetIndex)
routes.post("/", transactionController.handleSave)
routes.post("/delete/:id", transactionController.handleDelete)

module.exports = routes