import { TransactionService } from '../services/TransactionService'
import { Request, Response } from 'express'

interface RequestType {
    
    name: string;
    price: number;
    quantities: number;
    amount: number;
}

class TransactionController {

    async handleGetIndex(request: Request, response: Response){
        const transactionService = new TransactionService()

        const transaction = await transactionService.get()

        const status = transaction ?  response.render("index", { data: transaction }) : response.status(400).send("Request Failed!")

        return  status
    }
    
    async handleSave(request: Request, response: Response){
        const transactionService = new TransactionService()
        const { name, price, quantities, amount } = request.body as RequestType

        const transaction = await transactionService.get()
        
        await transactionService.create({
            name,
            price,
            quantities,
            amount
        })

        const status = transaction ?  response.render("index", { data: transaction }) : response.status(400).send("Request Failed!")

        return  status
    }

    async handleUpdate(request: Request, response: Response){
        const transactionService = new TransactionService()
        const id = request.params.id
        const { name, price, quantities, amount } = request.body as RequestType

        await transactionService.update({
            id,
            name,
            price,
            quantities,
            amount
        })

        return response.render("/")
    }

    async handleDelete(request: Request, response: Response){
        const transactionService = new TransactionService()
        const id = request.params.id 

        const transaction = await transactionService.get()
        await transactionService.delete(id)

        return response.render("index", { data: transaction })
    }

}

export { TransactionController }

/*
module.exports = {
    index(req,res){
        const data = DataBase.get()

        return res.render('index', { data })
    },
    save(req,res){
        const data = DataBase.get()

        DataBase.set({
            name: req.body.name,
            price: req.body.price,
            quantities: req.body.quantities,
            amount: req.body.amount
        });

        return res.render("index", { data })
    },
    update(req,res){
        const id = req.params.id
    
        DataBase.update({
            name: req.body.name,
            price: req.body.price,
            quantities: req.body.quantities,
            amount: req.body.amount
        }, id)

        return res.rend("/")
    },
    delete(req,res){
        const data = DataBase.get()
        DataBase.delete(req.params.id)

        return res.render("index", { data })
    }
}
*/