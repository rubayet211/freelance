import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Freelancer } from 'src/shared/entities/freelancer.entity';
import { ILike, Repository } from 'typeorm';
import { CreateFreelancerDto, UpdateFreelancerDto } from './freelancer.dto';
import { User } from 'src/shared/entities/user.entity';
import { Skill } from 'src/shared/entities/skills.entity';
import { projectsEntity } from 'src/shared/entities/projects.entity';

@Injectable()
export class FreelancerService {
  constructor(
    @InjectRepository(Freelancer)
    private readonly freelancerRepository: Repository<Freelancer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<User>,
    @InjectRepository(projectsEntity)
    private readonly projectsRepository: Repository<projectsEntity>,
  ) {}

  async getFreelancerById(userId: number) {
    const user = await this.userRepository.findOne({
      where: { userId: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log(user);
    const Freelancer = await this.freelancerRepository.findOne({
      where: { user: user },
    });

    return { ...Freelancer, user: user };
  }

  async findSimilarProjectsByTitle(title: string) {
    const similarProjects = await this.projectsRepository.find({
      where: {
        projectTitle: ILike(`%${title}%`),
      },
    });

    return similarProjects;
  }

  async getFreelancerByIdParam(userId: number) {
    const user = await this.userRepository.findOne({
      where: { userId: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const Freelancer = await this.freelancerRepository.findOne({
      where: { user: user },
    });

    return { ...Freelancer, user: user };
  }

  async addSkillsToFreelancer(
    freelancerId: number,
    userId: number,
    skills: string[],
  ) {
    const freelancer = await this.freelancerRepository.findOne({
      where: { freelancerId },
      relations: ['skills', 'user'],
    });

    const user = await this.userRepository.findOne({ where: { userId } });

    if (!freelancer) {
      throw new NotFoundException('Freelancer not found');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!Array.isArray(skills)) {
      skills = [];
    }

    const skillEntities = skills.map((skillName) => {
      const skill = new Skill();
      skill.name = skillName;
      return skill;
    });
    freelancer.skills = [...freelancer.skills, ...skillEntities];
    await this.freelancerRepository.save(freelancer);
    return freelancer;
  }

  async getProfilePicture(userId: number): Promise<string> {
    const freelancer = await this.userRepository.findOne({
      where: { userId: userId },
    });

    if (!freelancer) {
      throw new NotFoundException('Freelancer not found');
    }

    return freelancer.picture;
  }

  async deleteProfilePicture(userId: number): Promise<void> {
    await this.userRepository.update(userId, { picture: null });
  }

  async deleteSkill(skillId: number) {
    const result = await this.skillRepository.delete(skillId);
    if (result.affected === 1) {
      return 'deleted successfully';
    }

    return 'Skill not found or not deleted';
  }

  async deleteFreelancer(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { userId: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.freelancer', 'freelancer')
      .leftJoinAndSelect('freelancer.skills', 'skills')
      .where('user.userId = :userId', { userId })
      .getOne();

    if (user.freelancer) {
      const freelancer = user.freelancer;

      const skillIds = freelancer.skills.map((skill) => skill.skillId);
      const existingSkills = await this.skillRepository.findByIds(skillIds);
      if (existingSkills.length > 0) {
        await this.skillRepository.remove(existingSkills);
      }
      await this.freelancerRepository.remove(freelancer);
    }

    await this.userRepository.remove(user);
  }

  async uploadProfilePicture(userId: number, filename: string) {
    const freelancer = await this.userRepository.findOne({
      where: { userId: userId },
    });

    if (!freelancer) {
      throw new NotFoundException('Freelancer not found');
    }

    freelancer.picture = './uploads/' + filename;

    return await this.userRepository.save(freelancer);
  }

  async getProjects() {
    const projects = await this.projectsRepository.find();
    return projects;
  }

  async getProjectsById(id: number) {
    const project = await this.projectsRepository.findOne({
      where: { id: id },
    });
    return project;
  }
  async getProjectsBySkill(skill: string) {
    const projects = await this.projectsRepository.find({
      where: { Skills: skill },
    });
    return projects;
  }
}
