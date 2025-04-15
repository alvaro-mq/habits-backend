import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737168872103 implements MigrationInterface {
    name = 'Migration1737168872103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "oidc" character varying(100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "oidc"`);
    }

}
