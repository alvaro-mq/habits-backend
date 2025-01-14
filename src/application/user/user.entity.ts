import { AbstractEntity } from '../../common/dto//abstract.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Status } from '../../common/constants';
import { Role } from './role.entity';

const enumStatus = [
  Status.CREATE,
  Status.PENDING,
  Status.ACTIVE,
  Status.INACTIVE,
];

@Entity()
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ name: 'full_name', length: 150 })
  fullName: string;

  @Column({ length: 255 })
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  photo: string;

  @Column({
    type: 'enum',
    enum: enumStatus,
    default: Status.CREATE,
  })
  status: string;

  @ManyToOne(() => Role, (role) => role.user, {
    nullable: false,
    cascade: true,
  })
  @JoinColumn({
    name: 'id_rol',
    referencedColumnName: 'id',
  })
  public role!: Role;
}
