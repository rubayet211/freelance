import { Freelancer } from "src/shared/entities/freelancer.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { clientsEntity } from "./client.entities";

@Entity("Projects")
export class projectsEntity
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: true })
    projectTitle:string;

    @Column({ nullable: true })
    projectBudget:string;

    @Column({ nullable: true })
    projectDescription:string;
    
    @CreateDateColumn()
    createdAt:Date;

    @Column({ nullable: true })
    Skills:string;
    
    @Column({ nullable: true })
    rating:string;

    @Column({ nullable: true })
    image:string;

    @ManyToOne(()=>clientsEntity, (clientsEntity)=>clientsEntity.Projects)
    client:clientsEntity;

    @OneToOne(()=>Freelancer)
    @JoinColumn({
        name: "freelancerId"
    })
    Freelancer:Freelancer;

}