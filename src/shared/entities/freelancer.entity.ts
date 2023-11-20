import {
  Column,
  DeleteDateColumn,
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

  @Column({ nullable: true })
  description: string;

  @Column()
  hourlyRate: number;

  @Column({ nullable: true })
  availability: string;

  @OneToOne(() => User, (user) => user.freelancer, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToMany(() => Skill, { cascade: true, eager: true })
  @JoinTable()
  skills: Skill[];
}