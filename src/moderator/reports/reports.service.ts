import { Injectable } from '@nestjs/common';
import { ReportsEntity } from './reports.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(ReportsEntity) private reportsRepository: Repository<ReportsEntity>) {}
    
    async createReport(report: ReportsEntity): Promise<ReportsEntity> {
        return this.reportsRepository.save(report);
        }

}
