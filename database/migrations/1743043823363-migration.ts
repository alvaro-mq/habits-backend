import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743043823363 implements MigrationInterface {
    name = 'Migration1743043823363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "walk" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_created" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "user_updated" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text, "gpxFile" character varying, "distance" double precision, "duration" integer, "petId" uuid NOT NULL, CONSTRAINT "PK_5496583ce8e07b75f5d7b280aef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "advice" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_created" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "user_updated" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(500) NOT NULL, "description" character varying NOT NULL, "group" character varying(50) NOT NULL, "image_url" character varying(255), CONSTRAINT "PK_e20d6c014c3233fb2d811c441c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vaccine" DROP COLUMN "dateAdministered"`);
        await queryRunner.query(`ALTER TABLE "vaccine" DROP COLUMN "batchNumber"`);
        await queryRunner.query(`ALTER TABLE "vaccine" ADD "date_administered" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vaccine" ADD "batch_number" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "vaccine" DROP CONSTRAINT "PK_3879829f8d2e396157ebffab918"`);
        await queryRunner.query(`ALTER TABLE "vaccine" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "vaccine" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "vaccine" ADD CONSTRAINT "PK_3879829f8d2e396157ebffab918" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "vaccine" ALTER COLUMN "manufacturer" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "walk" ADD CONSTRAINT "FK_da8b3b22b604fb0e665132995c6" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "walk" DROP CONSTRAINT "FK_da8b3b22b604fb0e665132995c6"`);
        await queryRunner.query(`ALTER TABLE "vaccine" ALTER COLUMN "manufacturer" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vaccine" DROP CONSTRAINT "PK_3879829f8d2e396157ebffab918"`);
        await queryRunner.query(`ALTER TABLE "vaccine" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "vaccine" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vaccine" ADD CONSTRAINT "PK_3879829f8d2e396157ebffab918" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "vaccine" DROP COLUMN "batch_number"`);
        await queryRunner.query(`ALTER TABLE "vaccine" DROP COLUMN "date_administered"`);
        await queryRunner.query(`ALTER TABLE "vaccine" ADD "batchNumber" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "vaccine" ADD "dateAdministered" date NOT NULL`);
        await queryRunner.query(`DROP TABLE "advice"`);
        await queryRunner.query(`DROP TABLE "walk"`);
    }

}
