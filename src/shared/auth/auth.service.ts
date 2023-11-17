import { CreateFreelancerDto } from './dto/create-freelancer.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Freelancer } from '../entities/freelancer.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Skill } from '../entities/skills.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Freelancer)
    private readonly freelancerRepository: Repository<Freelancer>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async signUp(userDto: CreateUserDto, freelancerDto: CreateFreelancerDto) {
    const newUser = await this.userRepository.save(userDto);
    const { password, ...userResult } = newUser;

    const newFreelancer = this.freelancerRepository.create({
      skills: freelancerDto.skills.map((skillName) => ({ name: skillName })),
      hourlyRate: freelancerDto.hourlyRate,
      user: userResult,
    });
    const savedSkills = await this.skillRepository.save(newFreelancer.skills);

    const savedFreelancer = await this.freelancerRepository.save(newFreelancer);
    const { user: userWithoutPassword, ...newFreelancerResult } =
      savedFreelancer;
    return { user: userWithoutPassword, ...newFreelancerResult };
  }

  async signUpModerator(
    userDto: CreateUserDto,
    freelancerDto: CreateFreelancerDto,
  ) {
    const newUser = await this.userRepository.save(userDto);
    const { password, ...userResult } = newUser;

    const newFreelancer = this.freelancerRepository.create({
      skills: freelancerDto.skills.map((skillName) => ({ name: skillName })),
      hourlyRate: freelancerDto.hourlyRate,
      user: userResult,
    });
    const savedSkills = await this.skillRepository.save(newFreelancer.skills);

    const savedFreelancer = await this.freelancerRepository.save(newFreelancer);
    const { user: userWithoutPassword, ...newFreelancerResult } =
      savedFreelancer;
    return { user: userWithoutPassword, ...newFreelancerResult };
  }

  async signIn(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new Error('User not found');
    }
    if (user.password !== loginDto.password) {
      throw new Error('Wrong email or password');
    }
    const { password, ...userResult } = user;
    const freelancer = await this.freelancerRepository.findOne({
      where: { user: userResult },
    });
    if (!freelancer) {
      throw new Error('Freelancer not found');
    }
    return { user: userResult, ...freelancer };
  }

  //moved to freelancer.service.ts
  // async getFreelancerById(freelancerId: number) {
  //   const freelancer = await this.freelancerRepository
  //     .createQueryBuilder('freelancer')
  //     .leftJoinAndSelect('freelancer.skills', 'skills')
  //     .leftJoinAndSelect('freelancer.user', 'user')
  //     .where('freelancer.freelancerId = :freelancerId', { freelancerId })
  //     .getOne();
  //   if (!freelancer) {
  //     throw new NotFoundException('Freelancer not found');
  //   }
  //   return freelancer;
  // }
}
