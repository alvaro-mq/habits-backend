import { AbstractEntity } from 'src/common/dto/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
export class Walk extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /* @Column('json', { nullable: false })
  route: { lat: number; lng: number }[]; */

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  gpxFile: string;

  @Column({ type: 'float', nullable: true })
  distance: number; // Distancia en km

  @Column({ type: 'int', nullable: true })
  duration: number; // Duración en segundos

  @Column({ type: 'varchar', nullable: true })
  location: string;

  @Column({ type: 'varchar', nullable: true })
  date: string;

  @ManyToOne(() => Pet, (pet) => pet.vaccine, {
    nullable: false,
    cascade: true,
  })
  public pet!: Pet;
}
