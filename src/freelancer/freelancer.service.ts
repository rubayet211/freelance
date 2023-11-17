// freelancer.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Freelancer } from 'src/shared/entities/freelancer.entity';
import { Repository } from 'typeorm';
import { CreateFreelancerDto, UpdateFreelancerDto } from './freelancer.dto';
import { User } from 'src/shared/entities/user.entity';
import { Skill } from 'src/shared/entities/skills.entity';

@Injectable()
export class FreelancerService {
  constructor(
    @InjectRepository(Freelancer)
    private readonly freelancerRepository: Repository<Freelancer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<User>,
  ) {}

  async getFreelancerById(userId: number): Promise<Freelancer> {
    const user = await this.userRepository.findOne({
      where: { userId: userId },
    });
    console.log(user);
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
}
