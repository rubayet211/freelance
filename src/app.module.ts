import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { FreelancerModule } from './freelancer/freelancer.module';
import { ModeratorModule } from './moderator/moderator.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
<<<<<<< HEAD
  imports: [AdminModule, FreelancerModule, ModeratorModule, TypeOrmModule.forRoot({
    type: 'postgres',
=======
  imports: [AdminModule, FreelancerModule, ModeratorModule, TypeOrmModule.forRoot(
    { type: 'postgres',
>>>>>>> 910df35d92918525d7ba4330603ce16e38877697
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root123',
<<<<<<< HEAD
    database: 'freelance',
    autoLoadEntities: true,
    synchronize: true,
  })],
=======
    database: 'freelance',//Change to your database name
    autoLoadEntities: true,
    synchronize: true,
    } ),],
>>>>>>> 910df35d92918525d7ba4330603ce16e38877697
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
