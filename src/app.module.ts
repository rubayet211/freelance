import { Module } from '@nestjs/common';
import { ModeratorModule } from './moderator/moderator.module';
import { FreelancerModule } from './freelancer/freelancer.module';
import { AuthModule } from './shared/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './clients/clients.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ClientsModule,
    ModeratorModule,
    AdminModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root123',
      database: 'freelance',
      autoLoadEntities: true,
      synchronize: true,
    }),
    FreelancerModule,

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}