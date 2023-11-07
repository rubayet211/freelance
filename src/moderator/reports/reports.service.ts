import { Injectable } from '@nestjs/common';
import { ReportsEntity } from './reports.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportsDto } from './reports.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(ReportsEntity) private reportsRepository: Repository<ReportsEntity>) {}
    
    async createReport(report: ReportsDto): Promise<ReportsEntity> {
        return this.reportsRepository.save(report);
        }

}
