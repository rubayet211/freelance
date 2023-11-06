import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementDto } from './announcement.dto';

@Controller('announcement')
export class AnnouncementController {
    constructor(private readonly announcementService: AnnouncementService) { }

    @Get()
    getAnnouncements(): object {
        return this.announcementService.getAnnouncements();
    }

    @Post('createAnnouncement')
    @UsePipes(new ValidationPipe())
    createAnnouncement(@Body() announce: AnnouncementDto): object {
        return this.announcementService.createAnnouncement(announce);
    }

}
