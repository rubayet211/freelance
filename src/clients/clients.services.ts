import { Inject, Injectable, Options } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomUUID } from "crypto";
import { DataSource, Repository } from "typeorm";
import { DeleteResult } from "typeorm/driver/mongodb/typings";
import { clientCredentials } from "./dto/clients.dto";
import { clientEntity } from "./entitties/client.entities";

@Injectable()
export class ClientsServices{

   constructor
   (
      @InjectRepository(clientEntity)
      private userRepository: Repository<clientEntity>
   ){}

   createClient(clientDetails:clientCredentials)
   {
      this.userRepository.save(clientDetails);
   }

   FindAllClients(): Promise<clientEntity[]>
   {
      return this.userRepository.find();
      // find() is an asynchronous function. It returns a Promise.
   } 

   FindOneClient(id:number): Promise<clientEntity[]>
   {
      return this.userRepository.findBy({id});
   }

   FindAllClientsByType(params:string): Promise<clientEntity[]>
   {
      return this.userRepository.find({where: {type:params}});
   }

   DeleteClient(id:number): Promise<clientEntity[]>
   {
      this.userRepository.delete(id);
      return this.FindOneClient(id);
   }

   PatchUpdateClient(id, body)
   {
      this.userRepository.update(id,body);
   }
}