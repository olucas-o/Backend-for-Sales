import { MigrationInterface, QueryRunner } from 'typeorm';
export class npmConfigName1746477203127 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP CONSTRAINT IF EXISTS "FK_27ca18f2453639a1cafb7404ece"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products" DROP CONSTRAINT IF EXISTS "ordersProductsProducts"`,
    );

    await queryRunner.query(
      `ALTER TABLE "order_products" DROP COLUMN "productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products" DROP COLUMN IF EXISTS "productId"`,
    );

    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" CASCADE`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "id" SERIAL PRIMARY KEY`,
    );

    await queryRunner.query(
      `ALTER TABLE "order_products" ADD "productId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD CONSTRAINT "FK_27ca18f2453639a1cafb7404ece" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP CONSTRAINT IF EXISTS "FK_27ca18f2453639a1cafb7404ece"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP COLUMN "productId"`,
    );

    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "products_pkey"`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4()`,
    );

    await queryRunner.query(
      `ALTER TABLE "order_products" ADD "productId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD CONSTRAINT "FK_27ca18f2453639a1cafb7404ece" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE`,
    );
  }
}
