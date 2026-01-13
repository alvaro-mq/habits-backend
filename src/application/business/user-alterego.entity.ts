import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { AbstractEntity } from 'src/common/dto/abstract.entity';
import { User } from '../user/user.entity';
import { AlterEgo } from './alterego.entity';

@Entity()
@Unique(['user', 'alterEgo'])
export class UserAlterEgo extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  customName: string;

  @Column({ nullable: true })
  customImage: string;

  @ManyToOne(() => User, (user) => user.userAlterEgos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => AlterEgo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'alterEgoId' })
  alterEgo: AlterEgo;

  @Column({ default: true })
  isActive: boolean;
}
