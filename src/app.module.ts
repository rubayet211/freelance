import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { FreelancerModule } from './freelancer/freelancer.module';
import { ModeratorModule } from './moderator/moderator.module';
import { AuthModule } from './shared/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'freelance',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AdminModule,
    FreelancerModule,
    ModeratorModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
