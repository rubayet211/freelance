import { Module } from '@nestjs/common';
import { FreelancerController } from './freelancer.controller';
import { FreelancerService } from './freelancer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Freelancer } from 'src/shared/entities/freelancer.entity';
import { Skill } from 'src/shared/entities/skills.entity';
import { User } from 'src/shared/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { clientsEntity } from 'src/shared/entities/clients.entity';
import { projectsEntity } from 'src/shared/entities/projects.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Freelancer,
      Skill,
      clientsEntity,
      projectsEntity,
    ]),
    JwtModule.register({
      secret: '3585a01c430586ddc5b54d19c579284c',
    }),
  ],
  controllers: [FreelancerController],
  providers: [FreelancerService, JwtStrategy, JwtAuthGuard],
  exports: [JwtModule],
})
export class FreelancerModule {}
