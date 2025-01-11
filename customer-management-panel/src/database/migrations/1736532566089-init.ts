import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1736532346512 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // First add the column allowing null
        await queryRunner.query(`ALTER TABLE "orders" ADD COLUMN "foreignId" integer`);
        
        // Update existing records
        await queryRunner.query(`UPDATE "orders" SET "foreignId" = 0`);
        
        // Now make it not null
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "foreignId" SET NOT NULL`);
        
        // Set default for future records
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "foreignId" SET DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "foreignId"`);
    }
}