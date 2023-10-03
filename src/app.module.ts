import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './clients/client/client.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [ClientModule, ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
