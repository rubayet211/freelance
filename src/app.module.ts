import { Module } from '@nestjs/common';
import { ModeratorModule } from './moderator/moderator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './clients/clients.module';
import { AuthModule } from './shared/auth/auth.module';
import { FreelancerModule } from './freelancer/freelancer.module';


@Module({
  imports: [ClientsModule,
    ModeratorModule,
    AuthModule,
    FreelancerModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
