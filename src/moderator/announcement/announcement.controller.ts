import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
import { ModeratorEntity } from '../moderator.entity';

@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Get()
  getAnnouncements(): object {
    return this.announcementService.getAnnouncements();
  }

  @Post('createAnnouncement/:moderatorId')
  @UsePipes(new ValidationPipe())
  createAnnouncement(
    @Body() moderatorId: number,
    @Body() announcementDto: AnnouncementDto,
  ): Promise<AnnouncementEntity> {
    return this.announcementService.createAnnouncement(
      moderatorId,
      announcementDto,
    );
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

  @Put('assignModerator')
  async assignModerator(
    @Body('announcementId') announcementId: number,
    @Body('moderatorId') moderatorId: number,
  ): Promise<AnnouncementEntity> {
    try {
      return await this.announcementService.assignAnnouncement(
        announcementId,
        moderatorId,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
