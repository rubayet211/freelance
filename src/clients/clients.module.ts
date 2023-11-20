import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsController } from './clients.controller';
import { ClientsServices } from './clients.services';
import { clientsEntity } from './entitties/client.entities';
import { projectsEntity } from './entitties/clientproject.entities';
import { Freelancer } from 'src/shared/entities/freelancer.entity';

@Module({
  imports: [
    MulterModule,
    TypeOrmModule.forFeature([clientsEntity, projectsEntity, Freelancer]),
  ],
  controllers: [ClientsController],
  providers: [ClientsServices],
})
export class ClientsModule {}
