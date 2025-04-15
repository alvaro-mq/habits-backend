import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736982047321 implements MigrationInterface {
    name = 'Migration1736982047321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "memory" RENAME COLUMN "imageUrl" TO "image_url"`);
        await queryRunner.query(`ALTER TABLE "pet" ADD "photo_url" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "photo_url"`);
        await queryRunner.query(`ALTER TABLE "memory" RENAME COLUMN "image_url" TO "imageUrl"`);
    }

}
