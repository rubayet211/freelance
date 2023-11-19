import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Freelancer } from './freelancer.entity';
import { clientsEntity } from './clients.entity';

@Entity('Projects')
export class projectsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectTitle: string;

  @Column()
  projectBudget: string;

  @Column()
  projectCurrency: string;

  @Column()
  projectDescription: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  Skills: string;

  @ManyToOne(() => clientsEntity, (clientsEntity) => clientsEntity.Projects)
  client: clientsEntity;

  @OneToOne(() => Freelancer)
  @JoinColumn({
    name: 'freelancerId',
  })
  Freelancer: Freelancer;
}
