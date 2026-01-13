import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from 'src/common/dto/abstract.entity';
import { Feat } from './feat.entity';

@Entity()
export class FeatParam extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @OneToMany(() => Feat, (feat) => feat.featParam)
  feats: Feat[];
}
