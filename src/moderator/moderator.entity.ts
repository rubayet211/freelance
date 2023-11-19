import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReportsEntity } from './reports/reports.entity';
import { Admin } from "src/admin/entities/admin.entities";


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

  @OneToOne(() => ReportsEntity, (report) => report.moderator)
  report: ReportsEntity;

  @OneToMany(()=> Admin , (Admin)=>Admin.Moderators)
  Admins : Admin[]
}
