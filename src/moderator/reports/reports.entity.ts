import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("reports")
export class ReportsEntity {
    @PrimaryGeneratedColumn()
    report_id: number;

    @Column()
    report_title: string;

    @Column()
    report_user: string;
    
    @Column()
    report_subject: string;

    @Column()
    report_description: string;

    // @Column()
    // report_date: Date;

    @Column()
    report_status: string;
}