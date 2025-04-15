import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737256043807 implements MigrationInterface {
    name = 'Migration1737256043807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "memory" ADD "date" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "memory" DROP COLUMN "date"`);
    }

}
