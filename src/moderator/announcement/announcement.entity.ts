import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AnnouncementEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    created_at: Date;
    @Column()
    updated_at: Date;
}