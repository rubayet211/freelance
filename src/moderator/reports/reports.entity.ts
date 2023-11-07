import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  user: string;

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

  @OneToOne(() => ModeratorEntity, (moderator) => moderator.report, {
    cascade: true,
  })
  @JoinColumn()
  moderator: ModeratorEntity;
}
