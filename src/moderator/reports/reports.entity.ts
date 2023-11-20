import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ModeratorEntity } from '../moderator.entity';

@Entity('reports')
export class ReportsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  subject: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @Column()
  status: string;

  @OneToOne(() => ModeratorEntity, (moderator) => moderator.report) // specify inverse side as a second parameter
  moderator: ModeratorEntity;
}
