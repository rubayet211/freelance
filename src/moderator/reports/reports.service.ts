import { Injectable } from '@nestjs/common';
import { ReportsEntity } from './reports.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportsDto } from './reports.dto';
import { ModeratorEntity } from '../moderator.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportsEntity)
    private reportsRepository: Repository<ReportsEntity>,
    @InjectRepository(ModeratorEntity)
    private moderatorRepository: Repository<ModeratorEntity>,
  ) {}

  async createReport(reportDto: ReportsDto): Promise<ReportsEntity> {
    const moderator = await this.moderatorRepository.findOneBy({
      id: reportDto.moderatorId,
    });
    if (!moderator) {
      throw new Error('Moderator not found');
    }
    const report = this.reportsRepository.create({ ...reportDto, moderator });
    return this.reportsRepository.save(report);
  }

  async getReports(): Promise<ReportsEntity[]> {
    return this.reportsRepository.find({ relations: ['moderator'] });
  }

  async updateReport(
    id: number,
    updateReportDto: ReportsDto,
  ): Promise<ReportsEntity> {
    const moderator = await this.moderatorRepository.findOneBy({
      id: updateReportDto.moderatorId,
    });
    if (!moderator) {
      throw new Error('Moderator not found');
    }
    const report = await this.reportsRepository.findOneBy({ id });
    if (!report) {
      throw new Error('Report not found');
    }
    report.moderator = moderator;
    return this.reportsRepository.save(report);
  }
}
