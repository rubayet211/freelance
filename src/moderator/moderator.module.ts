import { Module } from '@nestjs/common';
import { ModeratorController } from './moderator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeratorEntity } from './moderator.entity';
import { ModeratorService } from './moderator.service';

@Module({
  imports: [TypeOrmModule.forFeature([ModeratorEntity])],
  controllers: [ModeratorController],
  providers: [ModeratorService]
})
export class ModeratorModule { }
