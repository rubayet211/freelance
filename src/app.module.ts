import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [ClientsModule,TypeOrmModule.forRoot(
    { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'waledspg',
    database: 'ClientsDB',//Change to your database name
    autoLoadEntities: true,
    synchronize: true,
    } ),
    ],
  controllers: [],
  providers: [],
})

export class AppModule { }
