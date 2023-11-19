import { Freelancer } from "src/shared/entities/freelancer.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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
    projectCurrency:string;

    @Column()
    projectDescription:string;
    
    @CreateDateColumn()
    createdAt:Date;

    @Column()
    Skills:string;

    @ManyToOne(()=>clientsEntity, (clientsEntity)=>clientsEntity.Projects)
    client:clientsEntity;

    @OneToOne(()=>Freelancer)
    @JoinColumn({
        name: "freelancerId"
    })
    Freelancer:Freelancer;

}