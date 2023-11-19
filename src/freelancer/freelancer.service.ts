// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Freelancer } from 'src/shared/entities/freelancer.entity';
// import { Skill } from 'src/shared/entities/skills.entity';
// import { User } from 'src/shared/entities/user.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class FreelancerService {
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//     @InjectRepository(Freelancer)
//     private readonly freelancerRepository: Repository<Freelancer>,
//     @InjectRepository(Skill)
//     private readonly skillRepository: Repository<Skill>,
//   ) {}
//   async getFreelancerById(freelancerId: number) {
//     const freelancer = await this.freelancerRepository
//       .createQueryBuilder('freelancer')
//       .leftJoinAndSelect('freelancer.skills', 'skills')
//       .leftJoinAndSelect('freelancer.user', 'user')
//       .where('freelancer.freelancerId = :freelancerId', { freelancerId })
//       .getOne();
//     if (!freelancer) {
//       throw new Error('Freelancer not found');
//     }
//     return freelancer;
//   }
// }
