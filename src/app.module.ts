import { Module } from '@nestjs/common';
import { ModeratorModule } from './moderator/moderator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './clients/clients.module';
import { AuthModule } from './shared/auth/auth.module';
import { FreelancerModule } from './freelancer/freelancer.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ClientsModule,
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
  controllers: [],
  providers: [],
})
export class AppModule {}
