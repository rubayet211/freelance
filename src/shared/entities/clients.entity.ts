import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { projectsEntity } from './projects.entity';

@Entity('Clients')
export class clientsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  type: string;

  @Column()
  @Generated('uuid')
  UUID: string;

  @Column()
  Image: string;

  @OneToMany(() => projectsEntity, (projectsEntity) => projectsEntity.client)
  Projects: projectsEntity[];
}
