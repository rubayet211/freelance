import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { projectsEntity } from "./clientproject.entities";

@Entity("Clients")
export class clientsEntity
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
    
    @Column()
    Image:string;

    @OneToMany(()=>projectsEntity, (projectsEntity)=>projectsEntity.client)
    Projects:projectsEntity[];
}