import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ClientsController } from './clients.controller';
import { ClientsServices } from './clients.services';
import { clientEntity } from './entitties/client.entities';

@Module({
  imports: [TypeOrmModule.forFeature([clientEntity])],
  controllers: [ClientsController],
  providers:
    [
      ClientsServices
    ]})
export class ClientsModule { }
