import { Module } from '@nestjs/common';
import { ModeratorController } from './moderator.controller';
import { ModeratorService } from './moderator.service';
import { ModeratorEntity } from "./moderator.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnnouncementService } from './announcement/announcement.service';
import { AnnouncementController } from './announcement/announcement.controller';
import { AnnouncementEntity } from './announcement/announcement.entity';
import { ReportsModule } from './reports/reports.module';



@Module({
  imports: [ TypeOrmModule.forFeature([ModeratorEntity, AnnouncementEntity]),ReportsModule],
  controllers: [ModeratorController, AnnouncementController],
  providers: [ModeratorService, AnnouncementService]
})
export class ModeratorModule { }
