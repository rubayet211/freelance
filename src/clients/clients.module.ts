import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsServices } from './clients.services';

@Module({
  controllers: [ClientsController],
  providers: [ClientsServices],
})
export class ClientsModule {}
