import { Status } from 'src/common/constants';
import { AbstractEntity } from 'src/common/dto/abstract.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

const enumStatus = [
  Status.CREATE,
  Status.PENDING,
  Status.ACTIVE,
  Status.INACTIVE,
];

@Entity()
export class Pet extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  species: string;

  @Column({ length: 100 })
  breed: string;

  @Column({ length: 10 })
  sex: string;

  @Column({ type: 'date', nullable: true })
  birthDate: string;

  @Column({ length: 100 })
  color: string;

  @Column({ length: 100 })
  size: string;

  @Column({
    type: 'enum',
    enum: enumStatus,
    default: Status.CREATE,
  })
  status: string;

  @ManyToOne(() => User, (user) => user.pet, {
    nullable: false,
    cascade: true,
  })
  @JoinColumn({
    name: 'id_user',
    referencedColumnName: 'id',
  })
  public owner!: User;
}
