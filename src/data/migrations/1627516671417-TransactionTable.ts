import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class TransactionTable1627516671417 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "transaction",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true 
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "price",
                        type: "integer"
                    },
                    {
                        name: "quantities",
                        type: "integer"
                    },
                    {
                        name: "amount",
                        type: "integer"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transaction")
    }

}
