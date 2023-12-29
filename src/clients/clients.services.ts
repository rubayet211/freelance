import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientLoginDto } from './dto/clientlogin.dto';
import { clientCredentials } from './dto/clients.dto';
import { CreateProjectDTO } from './dto/create-project.dto';
import { clientsEntity } from './entitties/client.entities';
import { projectsEntity } from './entitties/clientproject.entities';
import * as bcrypt from 'bcrypt';
import { Freelancer } from 'src/shared/entities/freelancer.entity';

@Injectable()
export class ClientsServices {
  constructor(
    @InjectRepository(clientsEntity)
    private userRepository: Repository<clientsEntity>,
    @InjectRepository(projectsEntity)
    private projectRepository: Repository<projectsEntity>,
    @InjectRepository(Freelancer)
    private freelancerRepository: Repository<Freelancer>,
  ) {}

  async createClient(clientDetails) {
    // const salt = await bcrypt.genSalt();
    // const hassedPass = await bcrypt.hash(clientDetails.password , salt);
    // clientDetails.password = hassedPass;
    this.userRepository.save(clientDetails);
  }

  FindAllClients(): Promise<clientsEntity[]> {
    return this.userRepository.find({ relations: ['Projects'] });
  }

  FindOneClient(id: number): Promise<clientsEntity> {
    return this.userRepository.findOne({
      where: { id: id },
      relations: ['Projects'],
    });
  }

  // FindAllClientsByType(params: string): Promise<clientsEntity[]> {
  //   return this.userRepository.find({
  //     where: { type: params },
  //     relations: ['Projects'],
  //   });
  // }

  DeleteClient(id: number) {
    this.userRepository.delete(id);
  }

  PatchUpdateClient(id, body) {
    this.userRepository.update(id, body);
  }

  PutUpdateClient(id: number, body) {
    const { name, email, password, type, UUID, Image } = body;
    if (name == undefined) {
      throw new HttpException(
        'Since you are making a PUT request, name cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    } else if (email == undefined) {
      throw new HttpException(
        'Since you are making a PUT request, email cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    } else if (password == undefined) {
      throw new HttpException(
        'Since you are making a PUT request, password cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    } else if (type == undefined) {
      throw new HttpException(
        'Since you are making a PUT request, type cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    } else if (UUID == undefined) {
      throw new HttpException(
        'Since you are making a PUT request, UUID cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    } else if (Image == undefined) {
      throw new HttpException(
        'Since you are making a PUT request, Image cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.userRepository.save(body);
  }

  CreateClientImage(Id: number, path: string) {
    this.userRepository.update({ id: Id }, { image: path });
  }

  findclientimage(Id: number): Promise<clientsEntity> {
    return this.userRepository.findOne({
      select: {image: true },
      where: { id: Id },
    });
  }

  async ClientLogin(LoginCredentials: ClientLoginDto):Promise<clientsEntity> {
    const client = await this.userRepository.findOne({
      where: {
        email: LoginCredentials.email,
        password: LoginCredentials.password,
      },
    });
    console.log(client);
    return client;
  }

  async createClientProject(session, id: number, body: CreateProjectDTO) {
    const client = await this.userRepository.findOneBy({ id });
    if (!client) {
      throw new HttpException('No such client exists.', HttpStatus.BAD_REQUEST);
    }

    if (session == undefined) {
      throw new HttpException(
        'You have to be logged in to create a new project.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const newproject = this.projectRepository.create({
      ...body,
      client,
    });
    return this.projectRepository.save(newproject);
  }

  FindTheClientsProject(Id: number) {
    return this.projectRepository.find({
      relations: { client: true },
    });
  }

  PatchProject(Param: number, Body) {
    this.projectRepository.update(Param, Body);
  }

  PutProject(Param: number, Body) {
    if (Body.projectTitle == undefined) {
      throw new HttpException(
        'Since you are making a PUT request, Title cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    } else if (Body.projectBudget == undefined) {
      throw new HttpException(
        'Since you are making a PUT request, Budget cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    } else if (Body.projectDescription == undefined) {
      throw new HttpException(
        'Since you are making a PUT request, Description cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    } else if (Body.Skills == undefined) {
      throw new HttpException(
        'Since you are making a PUT request, Skills cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.projectRepository.save(Body);
  }

  async FindAllClientsLimited(query) {
    const limitedclients = await this.userRepository.find({ take: query });
    return limitedclients;
  }

  async FindAllProjects() {
    const limitedprojects = await this.projectRepository.find();
    return limitedprojects;
  }

  DeleteProject(id: number) {
    this.userRepository.delete(id);
  }

  async getfreelancer(projTitle) {
    const project = await this.projectRepository.findOne({
      relations: ['Freelancer'],
      where: { projectTitle: projTitle },
    });
    const freelancer = project.Freelancer;
    return freelancer;
  }

  async getsortedProject(sort) {
    return await this.projectRepository.find({
      select: {
        projectTitle: true,
        projectBudget: true,
      },
      order: {
        projectBudget: sort,
      },
    });
  }

  // getProjByCurrency(query: string): Promise<projectsEntity[]> {
  //   return this.projectRepository.find({
  //     relations: ['Projects'],
  //     where: { projectCurrency: query },
  //   });
  // }
}
