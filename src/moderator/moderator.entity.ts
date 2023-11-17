import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReportsEntity } from './reports/reports.entity';

@Entity('moderator')
export class ModeratorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  filename: string;

  @OneToOne(() => ReportsEntity, (report) => report.moderator) // specify inverse side as a second parameter
  @JoinColumn()
  report: ReportsEntity;
}
