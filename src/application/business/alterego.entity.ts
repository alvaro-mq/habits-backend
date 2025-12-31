import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from 'src/common/dto/abstract.entity';
import { HabitParam } from './habit-param.entity';

@Entity()
export class AlterEgo extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  customName: string;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => HabitParam, (param) => param.alterEgo)
  public habits!: HabitParam[];
}
