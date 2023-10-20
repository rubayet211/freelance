import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

<<<<<<< HEAD
@Entity('moderator')
export class ModeratorEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    email: string;
    @Column()
    password: string;

=======
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


>>>>>>> 910df35d92918525d7ba4330603ce16e38877697
}
