import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736912995193 implements MigrationInterface {
    name = 'Migration1736912995193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "memory" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_created" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "user_updated" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text NOT NULL, "imageUrl" character varying(255), "petId" uuid NOT NULL, CONSTRAINT "PK_719a982d08209b92cd1a0b1c4ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vaccine" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_created" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "user_updated" character varying, "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "manufacturer" character varying(255) NOT NULL, "dateAdministered" date NOT NULL, "dosage" character varying(255) NOT NULL, "batchNumber" character varying(255), "petId" uuid NOT NULL, CONSTRAINT "PK_3879829f8d2e396157ebffab918" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "oidc_id" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "memory" ADD CONSTRAINT "FK_62737b10b48a15931ff603ada52" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vaccine" ADD CONSTRAINT "FK_e5fa732ba57d312c60e99b38ce1" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vaccine" DROP CONSTRAINT "FK_e5fa732ba57d312c60e99b38ce1"`);
        await queryRunner.query(`ALTER TABLE "memory" DROP CONSTRAINT "FK_62737b10b48a15931ff603ada52"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "oidc_id"`);
        await queryRunner.query(`DROP TABLE "vaccine"`);
        await queryRunner.query(`DROP TABLE "memory"`);
    }

}
