import { Injectable, NotFoundException } from '@nestjs/common';
import { AnnouncementEntity } from './announcement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnouncementDto } from './announcement.dto';
import { ModeratorEntity } from '../moderator.entity';
import { PatchAnnouncementDto } from './patchAnnouncement.dto';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(AnnouncementEntity)
    private announcementRepository: Repository<AnnouncementEntity>,
    @InjectRepository(ModeratorEntity)
    private moderatorRepository: Repository<AnnouncementEntity>,
  ) {}

  async createAnnouncement(
    announcementDto: AnnouncementDto,
  ): Promise<AnnouncementEntity> {
    const newAnnouncement = this.announcementRepository.create(announcementDto);
    return this.announcementRepository.save(newAnnouncement);
  }

  async createAnnouncementWith(
    moderatorId: number,
    announcementDto: AnnouncementDto,
  ): Promise<AnnouncementEntity> {
    const moderator = await this.moderatorRepository.findOneBy({
      id: moderatorId,
    });

    if (!moderator) {
      throw new NotFoundException('Moderator not found');
    }

    const newAnnouncement = this.announcementRepository.create({
      ...announcementDto,
      moderator,
    });

    return this.announcementRepository.save(newAnnouncement);
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

  async assignAnnouncement(
    announcementId: number,
    moderatorId: number,
  ): Promise<AnnouncementEntity> {
    const moderator = await this.moderatorRepository.findOneBy({
      id: moderatorId,
    });

    if (!moderator) {
      throw new Error('Moderator not found');
    }

    const announcement = await this.announcementRepository.findOneBy({
      id: announcementId,
    });
    if (!announcement) {
      throw new Error('Announcement not found');
    }

    announcement.moderator = moderator[0];
    return this.announcementRepository.save(announcement);
  }
  async searchAnnouncements(keyword: string): Promise<AnnouncementEntity[]> {
    return this.announcementRepository
      .createQueryBuilder('announcement')
      .where('LOWER(announcement.title) LIKE LOWER(:keyword)', {
        keyword: `%${keyword}%`,
      })
      .orWhere('LOWER(announcement.description) LIKE LOWER(:keyword)', {
        keyword: `%${keyword}%`,
      })
      .getMany();
  }

  async patchAnnouncement(
    id: number,
    patchAnnouncementDto: PatchAnnouncementDto,
  ): Promise<AnnouncementEntity> {
    await this.announcementRepository.update(id, patchAnnouncementDto);
    return this.announcementRepository.findOneBy({ id });
  }

  async deleteAnnouncement(id: number): Promise<void> {
    const announcement = await this.announcementRepository.findOneBy({ id });
    if (!announcement) {
      throw new NotFoundException('Announcement not found');
    }
    await this.announcementRepository.remove(announcement);
  }
}
