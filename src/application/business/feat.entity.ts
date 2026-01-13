import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { AbstractEntity } from 'src/common/dto/abstract.entity';
import { FeatParam } from './feat-param.entity';
import { User } from '../user/user.entity';

@Entity()
export class Feat extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: string; // YYYY-MM-DD

  @Column()
  description: string;

  @Column()
  urlImage: string;

  @ManyToOne(() => FeatParam, (param) => param.feats, { onDelete: 'CASCADE' })
  featParam: FeatParam;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}
