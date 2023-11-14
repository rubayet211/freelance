import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { clientsEntity } from "./client.entities";

@Entity("Projects")
export class projectsEntity
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    projectTitle:string;

    @Column()
    projectBudget:string;

    @Column()
    projectDescription:string;
    
    @CreateDateColumn()
    createdAt:Date;

    @Column()
    Skills:string;

    @ManyToOne(()=>clientsEntity, (clientsEntity)=>clientsEntity.Projects)
    client:clientsEntity;

}