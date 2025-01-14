import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Status } from '../../common/constants';
import { User } from './user.entity';

const enumStatus = [Status.ACTIVE, Status.INACTIVE];

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ length: 150 })
  description: string;

  @Column({ type: 'enum', enum: enumStatus, default: Status.ACTIVE })
  status: string;

  @OneToMany(() => User, (user) => user.role)
  public user!: User[];
}
