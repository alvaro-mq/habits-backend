import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736852468784 implements MigrationInterface {
    name = 'Migration1736852468784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."pet_status_enum" AS ENUM('CREATE', 'PENDING', 'ACTIVE', 'INACTIVE')`);
        await queryRunner.query(`CREATE TABLE "pet" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_created" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "user_updated" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "species" character varying(100) NOT NULL, "breed" character varying(100) NOT NULL, "sex" character varying(10) NOT NULL, "birthDate" date, "color" character varying(100) NOT NULL, "size" character varying(100) NOT NULL, "status" "public"."pet_status_enum" NOT NULL DEFAULT 'CREATE', "id_user" uuid NOT NULL, CONSTRAINT "PK_b1ac2e88e89b9480e0c5b53fa60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_32f27cdade01661074ca0f15999" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_32f27cdade01661074ca0f15999"`);
        await queryRunner.query(`DROP TABLE "pet"`);
        await queryRunner.query(`DROP TYPE "public"."pet_status_enum"`);
    }

}
