import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementDto } from './announcement.dto';

@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Get()
  getAnnouncements(): object {
    return this.announcementService.getAnnouncements();
  }

  @Post('createAnnouncement')
  @UsePipes(new ValidationPipe())
  async createAnnouncement(
    @Body() moderatorId: number,
    @Body(ParseIntPipe) announcementDto: AnnouncementDto,
  ) {
    const announcement = await this.announcementService.createAnnouncement(
      moderatorId,
      announcementDto,
    );
    return announcement;
  }
}
