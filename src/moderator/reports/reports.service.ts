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

  // async createReport(reportDto: ReportsDto): Promise<ReportsEntity> {
  //   const { user, moderatorId, ...rest } = reportDto;
  //   const newReport = this.reportsRepository.create({
  //     ...rest,
  //     user: Number(user), // convert user to number
  //     moderator: { id: moderatorId }, // create a ModeratorEntity reference
  //   });
  //   await this.reportsRepository.save(newReport);
  //   return newReport;
  // }

  async getReports(): Promise<ReportsEntity[]> {
    return this.reportsRepository.find();
  }

  async assignReport(
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
      .where(
        'report.title LIKE :keyword OR report.subject LIKE :keyword OR report.description LIKE :keyword',
        { keyword: `%${keyword}%` },
      )
      .getMany();
  }
}
