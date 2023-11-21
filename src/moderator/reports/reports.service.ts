import { Injectable } from '@nestjs/common';
import { ReportsEntity } from './reports.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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
    const newReport = this.reportsRepository.create(reportDto);
    await this.reportsRepository.save(newReport);
    return newReport;
  }

  async getReports(): Promise<ReportsEntity[]> {
    return this.reportsRepository.find();
  }

  async assignReport(
    reportId: number,
    moderatorId: number,
  ): Promise<ReportsEntity> {
    const moderator = await this.moderatorRepository.findOneBy({
      id: moderatorId,
    });

    if (!moderator) {
      throw new Error('Moderator not found');
    }

    const report = await this.reportsRepository.findOneBy({ id: reportId });
    if (!report) {
      throw new Error('Report not found');
    }

    report.moderator = moderator;
    return this.reportsRepository.save(report);
  }

  async updateReport(
    id: number,
    updateReportDto: ReportsDto,
  ): Promise<ReportsEntity> {
    const moderator = await this.moderatorRepository.findOneBy({
      id,
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

  async deleteReport(id: number): Promise<void> {
    const report = await this.reportsRepository.findOneBy({ id });
    if (!report) {
      throw new Error('Report not found');
    }
    await this.reportsRepository.remove(report);
  }

  async searchReports(keyword: string): Promise<ReportsEntity[]> {
    return this.reportsRepository
      .createQueryBuilder('report')
      .where('report.title LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('report.subject LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('report.description LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('report.status LIKE :keyword', { keyword: `%${keyword}%` })
      .getMany();
  }
}
