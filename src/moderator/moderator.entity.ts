import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReportsEntity } from './reports/reports.entity';
import { AnnouncementEntity } from './announcement/announcement.entity';

@Entity('moderator')
export class ModeratorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
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

  @OneToMany(() => AnnouncementEntity, (announcement) => announcement.moderator)
  announcements: AnnouncementEntity[];
}
