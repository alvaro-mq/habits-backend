import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from 'src/common/dto/abstract.entity';
import { HabitParam } from './habit-param.entity';
import { UserAlterEgo } from './user-alterego.entity';
import { FeatParam } from './feat-param.entity';

@Entity()
export class AlterEgo extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  nameFemale: string;

  @Column({ nullable: true })
  customName: string;

  @Column({ nullable: true })
  customNameFemale: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  imageUrlFemale: string;

  @OneToMany(() => HabitParam, (param) => param.alterEgo)
  public habits!: HabitParam[];

  @OneToMany(() => FeatParam, (param) => param.alterEgo)
  public featParams!: FeatParam[];

  @OneToMany(() => UserAlterEgo, (userAlterEgo) => userAlterEgo.alterEgo)
  public userAlterEgos!: UserAlterEgo[];
}
