import { AbstractEntity } from 'src/common/dto/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
export class Vaccine extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string; // Nombre de la vacuna

  @Column({ type: 'varchar', length: 255, nullable: true })
  manufacturer: string; // Fabricante de la vacuna

  @Column({ name: 'date_administered', type: 'date' })
  dateAdministered: string; // Fecha en la que se administró la vacuna

  @Column({ type: 'varchar', length: 255 })
  dosage: string; // Dosis administrada (p.ej. 1ml, 2 dosis, etc.)

  @Column({
    name: 'batch_number',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  batchNumber: string; // Número de lote, si es aplicable

  @ManyToOne(() => Pet, (pet) => pet.vaccine, {
    nullable: false,
    cascade: true,
  })
  public pet!: Pet;
}
