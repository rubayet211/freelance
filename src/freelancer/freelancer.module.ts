import { Module } from '@nestjs/common';
import { FreelancerController } from './freelancer.controller';
import { FreelancerService } from './freelancer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Freelancer } from 'src/shared/entities/freelancer.entity';
import { Skill } from 'src/shared/entities/skills.entity';
import { User } from 'src/shared/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Freelancer, Skill])],
  controllers: [FreelancerController],
  providers: [FreelancerService],
})
export class FreelancerModule {}
