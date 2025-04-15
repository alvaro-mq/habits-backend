import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736824455664 implements MigrationInterface {
    name = 'Migration1736824455664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying(150) NOT NULL, "status" "public"."role_status_enum" NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_created" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "user_updated" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50) NOT NULL, "full_name" character varying(150) NOT NULL, "first_name" character varying(150), "last_name" character varying(150), "password" character varying(255), "email" character varying, "photo" character varying, "status" "public"."user_status_enum" NOT NULL DEFAULT 'CREATE', "id_rol" uuid NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parameter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying(15) NOT NULL, "name" character varying(50) NOT NULL, "group" character varying(15) NOT NULL, "type" character varying(15) NOT NULL, "description" character varying(255) NOT NULL, "status" "public"."parameter_status_enum" NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "UQ_739d1ad76dacab8e0a73da54e59" UNIQUE ("code"), CONSTRAINT "PK_cc5c047040f9c69f0e0d6a844a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_2b5eea11ccd09286c9dbec9f916" FOREIGN KEY ("id_rol") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_2b5eea11ccd09286c9dbec9f916"`);
        await queryRunner.query(`DROP TABLE "parameter"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
