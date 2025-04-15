import { AbstractEntity } from '../../common/dto//abstract.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
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

  @Column({ name: 'oidc_id', length: 100, nullable: true })
  oidcId: string;

  @Column({ name: 'oidc', length: 100, nullable: true })
  oidc: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ name: 'full_name', length: 150 })
  fullName: string;

  @Column({ name: 'first_name', length: 150, nullable: true })
  firstName: string;

  @Column({ name: 'last_name', length: 150, nullable: true })
  lastName: string;

  @Column({ length: 255, nullable: true })
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
