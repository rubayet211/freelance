import { Module } from '@nestjs/common';
import { ModeratorController } from './moderator.controller';
import { ModeratorService } from './moderator.service';
import { ModeratorEntity } from './moderator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementService } from './announcement/announcement.service';
import { AnnouncementController } from './announcement/announcement.controller';
import { AnnouncementEntity } from './announcement/announcement.entity';
import { ReportsEntity } from './reports/reports.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { ReportsController } from './reports/reports.controller';
import { ReportsService } from './reports/reports.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ModeratorEntity,
      AnnouncementEntity,
      ReportsEntity,
    ]),
    //gkkq nphc peac yabx
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'rubayet211@gmail.com',
          pass: 'gkkq nphc peac yabx',
        },
      },
    }),
  ],
  controllers: [ModeratorController, AnnouncementController, ReportsController],
  providers: [ModeratorService, AnnouncementService, ReportsService],
})
export class ModeratorModule {}
