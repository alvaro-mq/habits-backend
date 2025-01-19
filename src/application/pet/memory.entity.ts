import { AbstractEntity } from 'src/common/dto/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
export class Memory extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'image_url', type: 'varchar', length: 255, nullable: true })
  imageUrl: string;

  @ManyToOne(() => Pet, (pet) => pet.memory, {
    nullable: false,
    cascade: true,
  })
  public pet!: Pet;
}
