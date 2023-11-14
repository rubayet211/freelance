import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ClientsController } from './clients.controller';
import { ClientsServices } from './clients.services';
import { clientsEntity } from './entitties/client.entities';
import { projectsEntity } from './entitties/clientproject.entities';
import { ExampleInterceptor } from './interceptor/example/example.interceptor';
// import { ExampleMiddleware } from './middleware/example/example.middleware';

@Module({
  imports: [MulterModule, TypeOrmModule.forFeature([clientsEntity,projectsEntity])],
  controllers: [ClientsController],
  providers:
    [
      ClientsServices,
      ExampleInterceptor
      // MulterModule
    ]})
export class ClientsModule{ //implements NestModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(ExampleMiddleware).forRoutes('clients/new');
  // }
}
