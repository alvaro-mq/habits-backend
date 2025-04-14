import { AbstractEntity } from 'src/common/dto/abstract.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Advice extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  title: string;

  @Column()
  description: string;

  @Column({ length: 50 })
  group: string;

  @Column({ name: 'image_url', type: 'varchar', length: 255, nullable: true })
  imageUrl: string;
}
