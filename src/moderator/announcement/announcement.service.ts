import { Injectable } from '@nestjs/common';
import { AnnouncementEntity } from './announcement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnouncementDto } from './announcement.dto';

@Injectable()
export class AnnouncementService {
    constructor(@InjectRepository(AnnouncementEntity) private AnnouncementRepository: Repository<AnnouncementEntity>) { }

    async createAnnouncement(announcementdto: AnnouncementDto): Promise<AnnouncementEntity> {
        return await this.AnnouncementRepository.save(announcementdto);
    }
    async getAnnouncements(): Promise<AnnouncementEntity[]> {
        return await this.AnnouncementRepository.find();
    }
    async getAnnouncementById(id: number): Promise<AnnouncementEntity> {
        return await this.AnnouncementRepository.findOneBy({ id: id });
    }
    async updateAnnouncement(id: number, announcementdto: AnnouncementDto): Promise<any> {
        await this.AnnouncementRepository.update(id,announcementdto);
        return await this.AnnouncementRepository.findOneBy({ id: id });
    }

}
