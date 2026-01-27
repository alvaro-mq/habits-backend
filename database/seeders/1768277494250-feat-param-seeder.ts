import { FeatParam } from "src/application/business/feat-param.entity";
import { TextService } from "src/common/lib/text.service";
import { MigrationInterface, QueryRunner } from "typeorm";

export class  FeatParamSeeder1768277494250 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const featParam = [
            // Guardian
            {
                id: TextService.textToUuid('Retiro Digital'),
                name: 'Retiro Digital',
                description: 'Apagar el telefono o cualquier pantalla durante un tiempo considerable (por lo menos medio dia)',
                imageUrl: 'retiro_digital.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Guardian del Equilibrio')
            },
            {
                id: TextService.textToUuid('Dia de Voluntariado'),
                name: 'Dia de Voluntariado',
                description: 'Dedicar una jornada completa a ayudar en un refugio de animales o comedor social.',
                imageUrl: 'dia_voluntariado.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Guardian del Equilibrio')
            },
            {
                id: TextService.textToUuid('Caminata de Introspeccion'),
                name: 'Caminata de Introspeccion',
                description: 'Caminar 10-15 km en solitario por la naturaleza sin musica ni podcasts.',
                imageUrl: 'caminata_introspeccion.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Guardian del Equilibrio')
            },
            {
                id: TextService.textToUuid('Ayuno de Quejas'),
                name: 'Ayuno de Quejas',
                description: 'Pasar un dia entero sin emitir una sola queja verbal sobre nada ni nadie.',
                imageUrl: 'ayuno_quejas.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Guardian del Equilibrio')
            },
            {
                id: TextService.textToUuid('Baño de Bosque'),
                name: 'Baño de Bosque',
                description: 'Shinrin-yoku, pasar 4 horas en un bosque sin mas objetivo que observar y respirar',
                imageUrl: 'banio_bosque.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Guardian del Equilibrio')
            },
            // Sabio
            {
                id: TextService.textToUuid('Seminario Intensivo'),
                name: 'Seminario Intensivo',
                description: 'Asistir a una conferencia o curso presencial de un tema que desconozcas totalmente.',
                imageUrl: 'seminario_intensivo.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Sabio')
            },
            {
                id: TextService.textToUuid('Escribir un Ensayo'),
                name: 'Escribir un Ensayo',
                description: 'Investigar un tema profundo y escribir 5 paginas analizando tus conclusiones.',
                imageUrl: 'escribir_ensayo.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Sabio')
            },
            {
                id: TextService.textToUuid('Noche de observacion Astronomica'),
                name: 'Noche de observacion Astronomica',
                description: 'Ir a un lugar sin contaminacion luminica e identificar 5 constelaciones',
                imageUrl: 'noche_astronomica.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Sabio')
            },
            {
                id: TextService.textToUuid('Visita Cultural'),
                name: 'Visita Cultural',
                description: 'Ir a un museo y pasar al menos 30 minutos analizando una sola obra.',
                imageUrl: 'visita_cultural.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Sabio')
            },
            // Explorador
            {
                id: TextService.textToUuid('Viaje Express'),
                name: 'Viaje Express',
                description: 'Realizar un viaje sin planificar mucho.',
                imageUrl: 'viaje_express.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Explorador')
            },
            {
                id: TextService.textToUuid('Cena a ciegas'),
                name: 'Cena a ciegas',
                description: 'Ir a cenar a un restaurante solo, sin telefono, simplemente disfrutando la comida y el entorno.',
                imageUrl: 'cena_ciegas.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Explorador')
            },
            {
                id: TextService.textToUuid('Noche bajo las estrellas'),
                name: 'Noche bajo las estrellas',
                description: 'Acampar en un lugar permitido y dormir fuera de la comodidad de una cama.',
                imageUrl: 'noche_estrellas.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Explorador')
            },
            {
                id: TextService.textToUuid('Intercambio de Habilidades'),
                name: 'Intercambio de Habilidades',
                description: 'nseñar algo que sabes a un extraño a cambio de que él te enseñe algo a ti.',
                imageUrl: 'intercambio_habilidades.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Explorador')
            },
            {
                id: TextService.textToUuid('Dia Turista'),
                name: 'Dia Turista',
                description: 'Visitar tu propia ciudad como si fueras un visitante por primera vez.',
                imageUrl: 'dia_turista.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Explorador')
            },
            //Guerrero
             {
                id: TextService.textToUuid('Participar en una maraton'),
                name: 'Participar en una maraton',
                description: 'Participar en una maraton de correr por lo menos 5 km.',
                imageUrl: 'participar_maraton.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Guerrero')
            },
            {
                id: TextService.textToUuid('Ascenso a una Cumbre'),
                name: 'Ascenso a una Cumbre',
                description: 'Subir a la cima de una montaña o colina.',
                imageUrl: 'ascenso_cumbre.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Guerrero')
            },
            {
                id: TextService.textToUuid('Entrenamiento al Amanecer'),
                name: 'Entrenamiento al Amanecer',
                description: 'Realizar una sesion fisica exigente antes de que empiece el dia.',
                imageUrl: 'entrenamiento_amanecer.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Guerrero')
            },
            // Artista
            {
                id: TextService.textToUuid('Escribir un Manifiesto Personal'),
                name: 'Escribir un Manifiesto Personal',
                description: 'Redactar y decorar un documento con tus valores y vision de vida.',
                imageUrl: 'escribir_manifiesto.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Artista')
            },
            {
                id: TextService.textToUuid('Crear una obra'),
                name: 'Crear una obra',
                description: 'Crear una obra de arte original.',
                imageUrl: 'crear_obra.png',
                userCreated: 'admin',
                alterEgoId: TextService.textToUuid('Artista')
            }
        ];
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into(FeatParam)
            .values(featParam)
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
