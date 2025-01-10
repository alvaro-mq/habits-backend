import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { Status } from '../../common/constants';

const enumStatus = [Status.ACTIVE, Status.INACTIVE];

@Entity()
export class Parameter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 15, unique: true })
  code: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 15 })
  group: string;

  @Column({ length: 255 })
  descripcion: string;

  @Column({ type: 'enum', enum: enumStatus, default: Status.ACTIVE })
  status: string;
}
