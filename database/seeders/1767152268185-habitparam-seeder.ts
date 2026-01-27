import { TextService } from "src/common/lib/text.service";
import { MigrationInterface, QueryRunner } from "typeorm";
import { HabitParam } from "src/application/business/habit-param.entity";

export class  HabitParamSeeder1767152268185 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const habitParam = [
        // Guerrero
        {
            id: TextService.textToUuid('Ejercitar'),
            name: 'Ejercitar',
            description: 'Ejercitar',
            icon: 'fitness_center_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Guerrero'),
        },
        {
            id: TextService.textToUuid('Deportes'),
            name: 'Deportes',
            description: 'Deportes',
            icon: 'sports_soccer_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Guerrero'),
        },
        {
            id: TextService.textToUuid('Calistemia'),
            name: 'Calistemia',
            description: 'Calistemia',
            icon: 'sports_gymnastics_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Guerrero'),
        },
        {
            id: TextService.textToUuid('Entrenar Fuerza'),
            name: 'Entrenar Fuerza',
            description: 'Entrenar Fuerza',
            icon: 'fitness_center_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Guerrero'),
        },
        {
            id: TextService.textToUuid('Entrenar Cardio'),
            name: 'Entrenar Cardio',
            description: 'Entrenar Cardio',
            icon: 'directions_run_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Guerrero'),
        },
        {
            id: TextService.textToUuid('Desafio Fisico'),
            name: 'Desafio Fisico',
            description: 'Desafio Fisico',
            icon: 'whatshot_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Guerrero'),
        },
        {
            id: TextService.textToUuid('Ducha Fria'),
            name: 'Ducha Fria',
            description: 'Ducha Fria',
            icon: 'shower_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Guerrero'),
        },
        // Sabio
        {
            id: TextService.textToUuid('Leer'),
            name: 'Leer',
            description: 'Leer',
            icon: 'menu_book_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Sabio'),
        },
        {
            id: TextService.textToUuid('Estudiar'),
            name: 'Estudiar',
            description: 'Estudiar',
            icon: 'school_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Sabio'),
        },
        {
            id: TextService.textToUuid('Aprender Idioma'),
            name: 'Aprender Idioma',
            description: 'Aprender Idioma',
            icon: 'language_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Sabio'),
        },
        {
            id: TextService.textToUuid('Escuchar podcast'),
            name: 'Escuchar podcast',
            description: 'Escuchar podcast',
            icon: 'podcast_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Sabio'),
        },
        {
            id: TextService.textToUuid('Reflexionar'),
            name: 'Reflexionar',
            description: 'Reflexionar',
            icon: 'psychology_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Sabio'),
        },
        // Artista
        {
            id: TextService.textToUuid('Pintar'),
            name: 'Pintar',
            description: 'Pintar',
            icon: 'palette_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Artista'),
        },
        {
            id: TextService.textToUuid('Escribir'),
            name: 'Escribir',
            description: 'Escribir',
            icon: 'edit_note_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Artista'),
        },
        {
            id: TextService.textToUuid('Tocar Instrumento'),
            name: 'Tocar Instrumento',
            description: 'Tocar Instrumento',
            icon: 'music_note_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Artista'),
        },
        {
            id: TextService.textToUuid('Crear Contenido'),
            name: 'Crear Contenido',
            description: 'Crear Contenido',
            icon: 'video_camera_front_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Artista'),
        },
        {
            id: TextService.textToUuid('Capturar momentos y paisajes'),
            name: 'Capturar momentos y paisajes',
            description: 'Capturar momentos y paisajes',
            icon: 'photo_camera_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Artista'),
        },
        // Guardian del Equilibrio
        {
            id: TextService.textToUuid('Meditar'),
            name: 'Meditar',
            description: 'Meditar',
            icon: 'self_improvement_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Guardian del Equilibrio'),
        },
        {
            id: TextService.textToUuid('Beber Agua'),
            name: 'Beber Agua',
            description: 'Beber Agua',
            icon: 'local_drink_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Guardian del Equilibrio'),
        },
        {
            id: TextService.textToUuid('Dormir Temprano'),
            name: 'Dormir Temprano',
            description: 'Dormir Temprano',
            icon: 'bedtime_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Guardian del Equilibrio'),
        },
        {
            id: TextService.textToUuid('Yoga'),
            name: 'Yoga',
            description: 'Yoga',
            icon: 'spa_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Guardian del Equilibrio'),
        },
        {
            id: TextService.textToUuid('Ordenar espacio'),
            name: 'Ordenar espacio',
            description: 'Ordenar espacio',
            icon: 'cleaning_services_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Guardian del Equilibrio'),
        },
        {
            id: TextService.textToUuid('Alimentacion Consciente'),
            name: 'Alimentacion Consciente',
            description: 'Alimentacion Consciente',
            icon: 'restaurant_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Guardian del Equilibrio'),
        },
        {
            id: TextService.textToUuid('Desconectar pantallas'),
            name: 'Desconectar pantallas',
            description: 'Desconectar pantallas',
            icon: 'phone_disabled_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Guardian del Equilibrio'),
        },
        // Explorador
        {
            id: TextService.textToUuid('Caminata'),
            name: 'Caminata',
            description: 'Caminata',
            icon: 'directions_walk_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Explorador'),
        },
        {
            id: TextService.textToUuid('Viajar'),
            name: 'Viajar',
            description: 'Viajar',
            icon: 'flight_takeoff_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Explorador'),
        },
        {
            id: TextService.textToUuid('Probar comida'),
            name: 'Probar comida',
            description: 'Probar comida',
            icon: 'restaurant_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Explorador'),
        },
        {
            id: TextService.textToUuid('Conocer Personas'),
            name: 'Conocer Personas',
            description: 'Conocer Personas',
            icon: 'person_search_rounded',
            userCreated: 'admin',
            alterEgoId: TextService.textToUuid('Explorador'),
        },
      ];
    
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(HabitParam)
        .values(habitParam)
        .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
