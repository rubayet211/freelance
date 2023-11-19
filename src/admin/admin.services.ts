import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Freelancer } from "src/shared/entities/freelancer.entity";
import { Admin } from "src/admin/entities/admin.entities";
import { clientsEntity } from "src/clients/entitties/client.entities";
import { ModeratorEntity } from "src/moderator/moderator.entity";
import { projectsEntity } from "src/clients/entitties/clientproject.entities";
import { AdminLoginDto } from "./DTO/logindto.dto";

@Injectable()
export class AdminServices{

   constructor
   (
      @InjectRepository(Admin)
      private adminRepository: Repository<Admin>,

      @InjectRepository(clientsEntity)
      private clientRepository: Repository<clientsEntity>,

      @InjectRepository(ModeratorEntity)
      private moderatorRepository: Repository<ModeratorEntity>,

      @InjectRepository(Freelancer)
      private freelancerRepository: Repository<Freelancer>,

      @InjectRepository(projectsEntity)
      private projectRepository: Repository<projectsEntity>
   ){}

   async createAdmin(adminDetails)
   {
      // const salt = await bcrypt.genSalt();
      // const hassedPass = await bcrypt.hash(adminDetails.password , salt);
      // adminDetails.password = hassedPass;
      await this.adminRepository.save(adminDetails);
   }

   async FindAllAdmins()
   {
      return await this.adminRepository.find();
   } 

   async FindAllClients()
   {
      return await this.clientRepository.find();
   }

   AdminLogin(LoginCredentials : AdminLoginDto)
   {
         const admin = this.adminRepository.find
         (
            {
               where:
               {
                  Email : LoginCredentials.Email, 
                  Password : LoginCredentials.Password
               }
            }
         );

         if(!admin)
         {
            throw new HttpException("Invalid Credentials" , HttpStatus.BAD_REQUEST);
         }
         return admin;
   }

   async findadminimage(id)
   {
      return await this.adminRepository.findOne({
         select:
         {
            Image : true
         },
          where:
          {
            id : id
         }
       });
   }

   async FindModeratorUnderMe(param)
   {
       await this.adminRepository.find({
         relations:['Moderators']
      });
   }


   async FindAllModerators()
   {
      return await this.moderatorRepository.find();
   }

   async FindAllFreelancers()
   {
      return await this.freelancerRepository.find();
   }

   async FindAllProjects()
   {

      return await this.projectRepository.find();
   }

   async PatchUpdateAdmin(id, body)
   {
      await this.adminRepository.update(id, body);
   }

   async PutUpdateAdmin(id, body)
   {
      if(body.Name == undefined)
      {
         throw new HttpException("Since you are making a PUT request, Name cannot be empty", HttpStatus.BAD_REQUEST);
      }
      else if(body.Email == undefined)
      {
         throw new HttpException("Since you are making a PUT request, Email cannot be empty", HttpStatus.BAD_REQUEST);     
      }
      else if(body.Password == undefined)
      {
         throw new HttpException("Since you are making a PUT request, Password cannot be empty", HttpStatus.BAD_REQUEST);
      }
      await this.adminRepository.save(body);
   }

   async DeleteProject(id : number)
   {
      await this.projectRepository.delete(id);
   }

   async DeleteClient(id : number)
   {
      await this.clientRepository.delete(id);
   }

   async DeleteModerator(id : number)
   {
      await this.clientRepository.delete(id);
   }

   async DeleteFreelancer(id : number)
   {
      await this.clientRepository.delete(id);
   }

   PatchProject(Param, Body)
   {
      this.projectRepository.update(Param, Body);
   }

   PatchClient(Param, Body)
   {
      this.clientRepository.update(Param, Body);
   }

   async FindAllAdminsLimited(query)
   {
      const limitedadmins = await this.adminRepository.find({ take: query});
      return limitedadmins;
   }

   PatchModerator(Param, Body)
   {
      this.moderatorRepository.update(Param, Body);
   }

   PatchFreelancer(Param, Body)
   {
      this.freelancerRepository.update(Param, Body);
   }

//    async getfreelancer(projTitle)
//    {
//       const project = await this.projectRepository.findOne({relations:['Freelancer'] , where: {projectTitle : projTitle}});
//       const freelancer = project.Freelancer;
//       return freelancer;
//    }

//    async getsortedProject(sort)
//    {
//       return await this.projectRepository.find({
//          select:
//          {
//             projectTitle:true,
//             projectBudget:true
//          },
//          order: 
//          {
//              projectBudget:sort
//          }
//      })
//    }

//    getProjByCurrency(query : string):Promise<projectsEntity[]>
//    {
//       return this.projectRepository.find
//       (
//       {
//          relations:['Projects'],
//          where: {projectCurrency : query}
//       }
//       );
//    }
}