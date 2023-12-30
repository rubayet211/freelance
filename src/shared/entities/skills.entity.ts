import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Freelancer } from './freelancer.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  skillId: number;

  @Column()
  name: string;


}