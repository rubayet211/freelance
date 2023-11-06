import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { FreelancerModule } from './freelancer/freelancer.module';
import { ModeratorModule } from './moderator/moderator.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AdminModule, FreelancerModule, ModeratorModule, TypeOrmModule.forRoot(
    { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root123',
    database: 'freelance',
    autoLoadEntities: true,
    synchronize: true,
    } ),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
