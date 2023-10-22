import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity("moderator")
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



}
