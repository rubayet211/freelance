import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { FreelancerModule } from './freelancer/freelancer.module';
import { ModeratorModule } from './moderator/moderator.module';

@Module({
  imports: [AdminModule, FreelancerModule, ModeratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
