import { Module } from '@nestjs/common';
import { ModeratorController } from './moderator.controller';
import { ModeratorService } from './moderator.service';
import { ModeratorEntity } from "./moderator.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnnouncementModule } from './announcement/announcement.module';



@Module({

  imports: [ TypeOrmModule.forFeature([ModeratorEntity]), AnnouncementModule,],
  controllers: [ModeratorController],
  providers: [ModeratorService]
})
export class ModeratorModule { }
