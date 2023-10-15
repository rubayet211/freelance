import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Clients")
export class clientEntity
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    type:string;

    @Column()
    UUID:string;

}