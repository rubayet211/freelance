import { Module } from '@nestjs/common';
import { ModeratorController } from './moderator.controller';
import { ModeratorService } from './moderator.service';
import { ModeratorEntity } from "./moderator.entity";
import { TypeOrmModule } from "@nestjs/typeorm";



@Module({
  imports: [ TypeOrmModule.forFeature([ModeratorEntity]),],
  controllers: [ModeratorController],
  providers: [ModeratorService]
})
export class ModeratorModule { }
