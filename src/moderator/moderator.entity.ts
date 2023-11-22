import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReportsEntity } from './reports/reports.entity';
import { AnnouncementEntity } from './announcement/announcement.entity';
import { Admin } from 'src/admin/entities/admin.entities';

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

  @OneToOne(() => ReportsEntity, (report) => report.moderator)
  @JoinColumn()
  report: ReportsEntity;

  @OneToMany(() => AnnouncementEntity, (announcement) => announcement.moderator)
  @JoinTable()
  announcements: AnnouncementEntity[];

  @OneToMany(() => Admin, (Admin) => Admin.Moderators)
  Admins: Admin[];
}
