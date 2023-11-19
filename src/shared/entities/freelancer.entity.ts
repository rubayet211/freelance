import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

}
