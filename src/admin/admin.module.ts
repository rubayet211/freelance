import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { clientsEntity } from 'src/clients/entitties/client.entities';
import { projectsEntity } from 'src/clients/entitties/clientproject.entities';
import { Freelancer } from 'src/shared/entities/freelancer.entity';
import { Admin } from 'src/admin/entities/admin.entities';
import { AdminController } from './admin.controller';
import { AdminServices } from './admin.services';
import { ModeratorEntity } from 'src/moderator/moderator.entity';

@Module({
  imports: 
  [
    MulterModule,
    TypeOrmModule.forFeature([Admin , clientsEntity, projectsEntity, Freelancer , ModeratorEntity]),
  ],
  controllers: 
  [
    AdminController
  ],
  providers: 
  [
    AdminServices
  ]
})
export class AdminModule {}
