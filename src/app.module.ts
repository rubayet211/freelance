import { Module } from '@nestjs/common';

import { FreelancerModule } from './freelancer/freelancer.module';

import { AuthModule } from './shared/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '20442903',
      database: 'Freelance',
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
