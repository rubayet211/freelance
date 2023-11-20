import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ModeratorEntity } from '../moderator.entity';

@Entity('announcement')
export class AnnouncementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  date: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(() => ModeratorEntity, (moderator) => moderator.announcements)
  moderator: ModeratorEntity;
}
