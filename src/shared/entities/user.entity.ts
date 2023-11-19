import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Freelancer } from './freelancer.entity';
export enum Role {
  freelancer = 'freelancer',
  moderator = 'moderator',
  admin = 'admin',
  client = 'client',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  role: Role;

  @Column({ nullable: true })
  firstName?: string | null;

  @Column({ nullable: true })
  lastName?: string | null;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone?: string | null;

  @Column({ nullable: true })
  address?: string | null;

  @Column({ nullable: true })
  picture?: string | null;

  @OneToOne(() => Freelancer, (freelancer) => freelancer.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  freelancer: Freelancer;
}
