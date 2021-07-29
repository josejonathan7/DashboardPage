import { EntityRepository, Repository } from 'typeorm'
import { TransactionEntity } from '../entity/TransactionEntity'

@EntityRepository(TransactionEntity)
class TransactionRepositorie extends Repository<TransactionEntity>{

}

export { TransactionRepositorie }