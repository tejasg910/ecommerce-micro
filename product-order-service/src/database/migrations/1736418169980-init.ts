import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1736418169980 implements MigrationInterface {
    name = 'Init1736418169980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "category" character varying(255) NOT NULL`);
    }

}
