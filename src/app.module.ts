import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuestModule } from './guest/guest.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { FreelancerModule } from './freelancer/freelancer.module';
import { ModeratorModule } from './moderator/moderator.module';

@Module({
  imports: [GuestModule, AdminModule, ClientModule, FreelancerModule, ModeratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
