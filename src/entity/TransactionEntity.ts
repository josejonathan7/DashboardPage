import {Column, Entity, PrimaryColumn} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("transaction")
class TransactionEntity {


    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    quantities: number;

    @Column()
    amount: number;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export { TransactionEntity }