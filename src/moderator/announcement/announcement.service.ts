import { Injectable } from '@nestjs/common';
import { AnnouncementEntity } from './announcement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnouncementDto } from './announcement.dto';
import { ModeratorEntity } from '../moderator.entity';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(AnnouncementEntity)
    private announcementRepository: Repository<AnnouncementEntity>,
    @InjectRepository(ModeratorEntity)
    private moderatorRepository: Repository<AnnouncementEntity>,
  ) {}

  async createAnnouncement(
    moderatorId: number,
    announcementDto: AnnouncementDto,
  ): Promise<AnnouncementEntity> {
    const moderator = await this.moderatorRepository.findOneBy({
      id: moderatorId,
    });
    if (!moderator) {
      throw new Error('Moderator not found');
    }
    const announcement = this.announcementRepository.create({
      ...announcementDto,
      moderator,
    });
    return this.announcementRepository.save(announcement);
  }
  async getAnnouncements(): Promise<AnnouncementEntity[]> {
    return await this.announcementRepository.find();
  }
  async getAnnouncementById(id: number): Promise<AnnouncementEntity> {
    return await this.announcementRepository.findOneBy({ id: id });
  }
  async updateAnnouncement(
    id: number,
    announcementdto: AnnouncementDto,
  ): Promise<any> {
    await this.announcementRepository.update(id, announcementdto);
    return await this.announcementRepository.findOneBy({ id: id });
  }
  async deleteAnnouncement(id: number): Promise<void> {
    const announcement = await this.announcementRepository.findOneBy({ id });
    if (!announcement) {
      throw new Error('Announcement not found');
    }
    await this.announcementRepository.remove(announcement);
  }
}
