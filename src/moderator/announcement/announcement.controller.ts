import { Controller, Get } from '@nestjs/common';

@Controller('announcement')
export class AnnouncementController {
    @Get()
    getAnnouncement(){
        return "announcement";
    }
}
