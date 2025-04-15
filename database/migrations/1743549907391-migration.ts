import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743549907391 implements MigrationInterface {
    name = 'Migration1743549907391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "walk" ADD "location" character varying`);
        await queryRunner.query(`ALTER TABLE "walk" ADD "date" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "walk" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "walk" DROP COLUMN "location"`);
    }

}
