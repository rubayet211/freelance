import { Module } from '@nestjs/common';
import { ModeratorController } from './moderator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeratorEntity } from './moderator.entity';
import { ModeratorService } from './moderator.service';
import { ModeratorEntity } from "./moderator.entity";
import { TypeOrmModule } from "@nestjs/typeorm";



@Module({
<<<<<<< HEAD
  imports: [TypeOrmModule.forFeature([ModeratorEntity])],
=======
  imports: [ TypeOrmModule.forFeature([ModeratorEntity]),],
>>>>>>> 910df35d92918525d7ba4330603ce16e38877697
  controllers: [ModeratorController],
  providers: [ModeratorService]
})
export class ModeratorModule { }
