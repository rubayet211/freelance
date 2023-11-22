import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Session,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsDto } from './reports.dto';
import { ModeratorService } from '../moderator.service';
import { ModeratorInfo } from '../moderator.dto';
import { ReportsEntity } from './reports.entity';
import { UpdateReportDto } from './updateStatus.dto';
import { DeleteModDto } from './deletemod.dto';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private moderatorService: ModeratorService,
  ) {}

  @Post('createReport')
  @UsePipes(new ValidationPipe())
  async createReport(@Body() reportDto: ReportsDto) {
    try {
      return await this.reportsService.createReport(reportDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async showAllReports() {
    try {
      return await this.reportsService.getReports();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('assignModerator')
  async assignReport(
    @Body('reportId') reportId: number,
    @Body('moderatorId') moderatorId: number,
  ): Promise<ReportsEntity> {
    try {
      return await this.reportsService.assignReport(reportId, moderatorId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('updateReportStatus/:id')
  async updateReport(
    @Param('id') id: number,
    @Body() updateReportDto: UpdateReportDto,
  ): Promise<ReportsEntity> {
    try {
      const report = await this.reportsService.updateReportStatus(
        id,
        updateReportDto.status,
      );
      return report;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('deleteReport/:id')
  async deleteReport(@Param('id') id: number) {
    try {
      return await this.reportsService.deleteReport(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('search')
  async searchReports(@Query('keyword') keyword: string) {
    try {
      return await this.reportsService.searchReports(keyword);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
