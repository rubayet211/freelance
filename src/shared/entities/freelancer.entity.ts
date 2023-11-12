import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Skill } from './skills.entity';
@Entity()
export class Freelancer {
  @PrimaryGeneratedColumn()
  freelancerId: number;

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];

  @Column({ nullable: true })
  description: string;

  @Column()
  hourlyRate: number;

  @Column({ nullable: true })
  availability: string;

  @OneToOne(() => User, (user) => user)
  @JoinColumn()
  user: User;
}
