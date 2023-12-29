import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { projectsEntity } from "./clientproject.entities";

@Entity("Clients")
export class clientsEntity
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    email:string;

    @Column({ nullable: true })
    password:string;
    
    @Column({ nullable: true })
    image:string;

    @OneToMany(()=>projectsEntity, (projectsEntity)=>projectsEntity.client)
    Projects:projectsEntity[];
}