import { TextService } from "src/common/lib/text.service";
import { MigrationInterface, QueryRunner } from "typeorm";

export class  AlterEgoSeeder1767143251766 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const alterego = [
        {
          id: TextService.textToUuid('Guerrero'),
          name: 'Guerrero',
          nameFemale: 'Guerrera',
          description: 'Fuerza, disciplina y constancia',
          customName: 'Ares el Guerrero',
          customNameFemale: 'Freya la Guerrera',
          imageUrl: 'file-1767222261823-192569628.png',
          imageUrlFemale: 'file-1768852605971-524054888.png',
          userCreated: 'admin',
        },
        {
          id: TextService.textToUuid('Sabio'),
          name: 'Sabio',
          nameFemale: 'Sabia',
          description: 'Conocimiento, lectura y reflexión',
          customName: 'Orion el Sabio',
          customNameFemale: 'Sophia la Sabia',
          imageUrl: 'file-1767222232394-373897725.png',
          imageUrlFemale: 'file-1768852569601-990337034.png',
          userCreated: 'admin',
        },
        {
          id: TextService.textToUuid('Artista'),
          name: 'Artista',
          nameFemale: 'Artista',
          description: 'Creatividad, expresión y emoción',
          customName: 'Numa el Artista',
          customNameFemale: 'Iria la Artista',
          imageUrl: 'file-1767222045332-718477817.png',
          imageUrlFemale: 'file-1768852518068-291541385.png',
          userCreated: 'admin',
        },
        {
          id: TextService.textToUuid('Guardian del Equilibrio'),
          name: 'Guardian del Equilibrio',
          nameFemale: 'Guardiana del Equilibrio',
          description: 'Bienestar, nutrición y equilibrio',
          customName: 'Kael el Guardian',
          customNameFemale: 'Kaia la Guardiana',
          imageUrl: 'file-1767222161689-377929184.png',
          imageUrlFemale: 'file-1768852546032-615743218.png',
          userCreated: 'admin',
        },
        {
          id: TextService.textToUuid('Explorador'),
          name: 'Explorador',
          nameFemale: 'Exploradora',
          description: 'Aventura, curiosidad y aprendizaje',
          customName: 'Atlas el Explorador',
          customNameFemale: 'Kira la Exploradora',
          imageUrl: 'file-1767222186965-307583523.png',
          imageUrlFemale: 'file-1768852586872-484595431.png',
          userCreated: 'admin',
        },
      ];
      
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('alter_ego')
        .values(alterego)
        .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
