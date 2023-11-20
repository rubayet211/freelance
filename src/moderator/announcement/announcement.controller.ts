import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementDto } from './announcement.dto';
import { AnnouncementEntity } from './announcement.entity';

@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Get()
  getAnnouncements(): object {
    return this.announcementService.getAnnouncements();
  }

  @Post('createAnnouncement')
  createAnnouncement(
    @Body() announcementDto: AnnouncementDto,
  ): Promise<AnnouncementEntity> {
    return this.announcementService.createAnnouncement(announcementDto);
  }
  @Put('updateAnnouncement/:id')
  async updateAnnouncement(
    @Param('id', ParseIntPipe) id: number,
    @Body() announcementDto: AnnouncementDto,
  ) {
    const announcement = await this.announcementService.updateAnnouncement(
      id,
      announcementDto,
    );
    return announcement;
  }

  @Delete('deleteAnnouncement/:id')
  async deleteAnnouncement(@Param('id', ParseIntPipe) id: number) {
    return this.announcementService.deleteAnnouncement(id);
  }
}
