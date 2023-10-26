import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { FreelancerModule } from './freelancer/freelancer.module';
import { ModeratorModule } from './moderator/moderator.module';
import { AuthController } from './shared/auth/auth.controller';
import { AuthModule } from './shared/auth/auth.module';

@Module({
  imports: [AdminModule, FreelancerModule, ModeratorModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
