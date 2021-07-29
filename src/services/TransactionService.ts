import { TransactionRepositorie } from '../repositorie/TransactionRepositorie'
import { getCustomRepository } from 'typeorm';
import { classToPlain } from 'class-transformer'

interface ITransactionRequest {
    id?: string;
    name: string;
    price: number;
    amount: number;
    quantities: number;
}

class TransactionService {

    async get(){
        const transactionRepositorie = getCustomRepository(TransactionRepositorie)

        const transactions = await transactionRepositorie.find()

        const status = transactions ? classToPlain(transactions) : ""

        return status
    } 

    async create({ name, price, quantities, amount }: ITransactionRequest){
        const transactionRepositorie = getCustomRepository(TransactionRepositorie)

        const transaction = transactionRepositorie.create({
            name: name,
            price: price,
            quantities: quantities,
            amount: amount
        })

        await transactionRepositorie.save(transaction)
    }

    async update({ id, name, price, quantities, amount }: ITransactionRequest){
        const transactionRepositorie = getCustomRepository(TransactionRepositorie)

        await transactionRepositorie.update(id, {
            name: name,
            price: price,
            quantities: quantities,
            amount: amount
        })

    }

    async delete( id: string ){
        const transactionRepositorie = getCustomRepository(TransactionRepositorie)

        await transactionRepositorie.delete(id)
    }

}

export { TransactionService }