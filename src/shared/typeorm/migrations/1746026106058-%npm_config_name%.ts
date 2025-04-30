import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class  npmConfigName1746026106058 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
      name: 'customerId',
      type: 'integer',
      isNullable: true,
      })
      );
       await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
      name: 'ordersCustomer',
      columnNames: ['customerId'],
      referencedTableName: 'customers',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
      })
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'OrdersCustomers');
    await queryRunner.dropColumn('orders','customerId');
  }
}
