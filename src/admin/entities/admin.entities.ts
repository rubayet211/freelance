import { ModeratorEntity } from "src/moderator/moderator.entity";
import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Admin")
export class Admin
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    Name: string;

    @Column()
    Email:string;

    @Column()
    Password:string;
    
    @Column()
    Image:string;

    @ManyToOne(()=>ModeratorEntity , (ModeratorEntity)=>ModeratorEntity.Admins)
    Moderators : ModeratorEntity;

    @Column()
    @Generated('uuid')
    UUID:string

}