import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AbstractEntity } from 'src/common/dto/abstract.entity';
import { Feat } from './feat.entity';
import { AlterEgo } from './alterego.entity';

@Entity()
export class FeatParam extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @OneToMany(() => Feat, (feat) => feat.featParam)
  feats: Feat[];

  @ManyToOne(() => AlterEgo, (alterEgo) => alterEgo.featParams, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'alterEgoId' })
  alterEgo: AlterEgo;
}
