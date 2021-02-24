import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1614127464333 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> { //método para criar a migration
      await queryRunner.createTable(
        new Table({
          name: "users",
          columns: [
            {
              name: "id",
              type: "uuid",
              isPrimary: true
            },
            {
              name: "name",
              type: "varchar"
            },
            {
              name: "email",
              type: "varchar"
            },
            {
              name: "created_at",
              type: "timestamp",
              default: "now()",
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> { //remover migration
      await queryRunner.dropTable("users");
    }

}
