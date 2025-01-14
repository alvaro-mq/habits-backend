import { MigrationInterface, QueryRunner } from 'typeorm';

export class BreedSeeder1736478397349 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const parameters = [
      {
        code: 'CRI',
        name: 'Criollo (Mestizo)',
        group: 'Mestizos',
        type: 'CAN',
        description:
          'Perros sin raza definida, conocidos por su diversidad genética, resistencia y gran adaptabilidad.',
      },
      {
        code: 'LAB',
        name: 'Labrador Retriever',
        group: 'Deportivos',
        type: 'CAN',
        description:
          'Raza conocida por su inteligencia, amabilidad y aptitudes para la caza y el rescate.',
      },
      {
        code: 'GSD',
        name: 'Pastor Alemán',
        group: 'Trabajo',
        type: 'CAN',
        description:
          'Raza leal, versátil y altamente entrenable, utilizada frecuentemente en trabajos policiales y de búsqueda y rescate.',
      },
      {
        code: 'GOLD',
        name: 'Golden Retriever',
        group: 'Deportivos',
        type: 'CAN',
        description:
          'Raza amigable y confiable, excelente para familias y conocida por su habilidad en la recuperación.',
      },
      {
        code: 'BEA',
        name: 'Beagle',
        group: 'Sabuesos',
        type: 'CAN',
        description:
          'Raza pequeña y enérgica, conocida por su gran sentido del olfato y personalidad amistosa.',
      },
      {
        code: 'SIBH',
        name: 'Husky Siberiano',
        group: 'Trabajo',
        type: 'CAN',
        description:
          'Raza conocida por su resistencia, velocidad y naturaleza amigable; utilizada como perro de trineo.',
      },
      {
        code: 'BULL',
        name: 'Bulldog',
        group: 'No Deportivos',
        type: 'CAN',
        description:
          'Raza robusta y calmada, famosa por su apariencia única y temperamento tranquilo.',
      },
      {
        code: 'POOD',
        name: 'Poodle',
        group: 'No Deportivos',
        type: 'CAN',
        description:
          'Raza elegante e inteligente, disponible en diferentes tamaños, conocida por su pelaje rizado.',
      },
      {
        code: 'YORK',
        name: 'Yorkshire Terrier',
        group: 'Juguetes',
        type: 'CAN',
        description:
          'Pequeña pero valiente, esta raza es popular por su tamaño compacto y pelaje largo y sedoso.',
      },
      {
        code: 'DAL',
        name: 'Dálmata',
        group: 'No Deportivos',
        type: 'CAN',
        description:
          'Raza conocida por su distintivo pelaje moteado y su energía vibrante.',
      },
      {
        code: 'CHIH',
        name: 'Chihuahua',
        group: 'Juguetes',
        type: 'CAN',
        description:
          'Raza pequeña y alerta, conocida por su gran personalidad y afecto hacia sus dueños.',
      },
      {
        code: 'AKIT',
        name: 'Akita Inu',
        group: 'Trabajo',
        type: 'CAN',
        description:
          'Raza japonesa conocida por su lealtad y fuerza, utilizada tradicionalmente como perro de guardia.',
      },
      {
        code: 'SHBT',
        name: 'Shiba Inu',
        group: 'No Deportivos',
        type: 'CAN',
        description:
          'Raza pequeña japonesa conocida por su personalidad independiente y apariencia de zorro.',
      },
      {
        code: 'CORG',
        name: 'Pembroke Welsh Corgi',
        group: 'Pastores',
        type: 'CAN',
        description:
          'Raza pequeña y ágil, famosa por su inteligencia y naturaleza amistosa.',
      },
      {
        code: 'ROTT',
        name: 'Rottweiler',
        group: 'Trabajo',
        type: 'CAN',
        description:
          'Raza fuerte y protectora, ideal como perro guardián o de servicio.',
      },
      {
        code: 'BOX',
        name: 'Bóxer',
        group: 'Trabajo',
        type: 'CAN',
        description:
          'Raza enérgica, juguetona y protectora, ideal como perro de compañía o guardián.',
      },
      {
        code: 'MALT',
        name: 'Maltés',
        group: 'Juguetes',
        type: 'CAN',
        description:
          'Raza pequeña y afectuosa, conocida por su pelaje blanco y personalidad alegre.',
      },
      {
        code: 'DOX',
        name: 'Dachshund',
        group: 'Sabuesos',
        type: 'CAN',
        description:
          "Raza conocida como 'perro salchicha', famosa por su cuerpo largo y patas cortas.",
      },
      {
        code: 'SHPE',
        name: 'Shar Pei',
        group: 'No Deportivos',
        type: 'CAN',
        description:
          'Raza china conocida por sus arrugas distintivas y carácter reservado.',
      },
      {
        code: 'GRTD',
        name: 'Gran Danés',
        group: 'Trabajo',
        type: 'CAN',
        description:
          'Raza gigante conocida por su tamaño imponente y temperamento gentil.',
      },
    ];
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('parameter')
      .values(parameters)
      .execute();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
