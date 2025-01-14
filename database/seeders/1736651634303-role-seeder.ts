import { TextService } from 'src/common/lib/text.service';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class RoleSeeder1736651634303 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roles = [
      {
        id: TextService.textToUuid('ADMIN'),
        name: 'ADMIN',
        description: 'admin',
      },
      {
        id: TextService.textToUuid('TUTOR'),
        name: 'TUTOR',
        description: 'Tutor',
      },
      {
        id: TextService.textToUuid('VET'),
        name: 'VET',
        description: 'Veterinary',
      },
      {
        id: TextService.textToUuid('SELLER'),
        name: 'SELLER',
        description: 'Seller',
      },
    ];
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('role')
      .values(roles)
      .execute();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
