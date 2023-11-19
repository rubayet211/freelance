import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
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
  async createReport(@Body() reportDto: ReportsDto) {
    return this.reportsService.createReport(reportDto);
  }

  @Get()
  showAllReports() {
    return this.reportsService.getReports();
  }

  @Put('assignModerator/:id')
  async updateReport(
    @Param('id') id: number,
    @Body() updateReportDto: ReportsDto,
  ) {
    const report = await this.reportsService.assignReport(id, updateReportDto);
    return report;
  }
}
