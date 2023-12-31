import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementDto } from './announcement.dto';
import { AnnouncementEntity } from './announcement.entity';
import { ModeratorEntity } from '../moderator.entity';
import { PatchAnnouncementDto } from './patchAnnouncement.dto';

@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Get()
  getAnnouncements(): object {
    return this.announcementService.getAnnouncements();
  }

  @Post('createAnnouncement')
  @UsePipes(new ValidationPipe())
  createAnnouncement(
    @Body() announcementDto: AnnouncementDto,
  ): Promise<AnnouncementEntity> {
    return this.announcementService.createAnnouncement(announcementDto);
  }

  @Post('createAnnouncementWith/:moderatorId')
  @UsePipes(new ValidationPipe())
  createAnnouncementWith(
    @Param('moderatorId', ParseIntPipe) moderatorId: number,
    @Body() announcementDto: AnnouncementDto,
  ): Promise<AnnouncementEntity> {
    return this.announcementService.createAnnouncementWith(
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

  @Get('search')
  async searchAnnouncements(
    @Query('keyword') keyword: string,
  ): Promise<AnnouncementEntity[]> {
    return this.announcementService.searchAnnouncements(keyword);
  }

  @Delete('deleteAnnouncement/:id')
  async deleteAnnouncement(@Param('id', ParseIntPipe) id: number) {
    return this.announcementService.deleteAnnouncement(id);
  }

  @Get('getAnnouncementsWithmod')
  async getAnnouncementsWithMod(): Promise<AnnouncementEntity[]> {
    return this.announcementService.getAnnouncementsWithmod();
  }
}
