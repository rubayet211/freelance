import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsDto } from './reports.dto';
import { ModeratorService } from '../moderator.service';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private moderatorService: ModeratorService,
  ) {}

  @Post('createReport')
  @UsePipes(new ValidationPipe())
  async createReport(@Body() report: ReportsDto) {
    const moderator = await this.moderatorService.getModeratorById(
      report.moderatorId,
    );
    return this.reportsService.createReport(report, moderator);
  }

  @Get()
  showAllReports() {
    return this.reportsService.showAll();
  }
}
