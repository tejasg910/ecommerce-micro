import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1736593697299 implements MigrationInterface {
    name = 'Init1736593697299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "isDeleted"`);
    }

}
