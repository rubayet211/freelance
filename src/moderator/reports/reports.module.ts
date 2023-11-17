import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportsEntity } from './reports.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeratorEntity } from '../moderator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportsEntity, ModeratorEntity])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
