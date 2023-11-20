import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsDto } from './reports.dto';
import { ModeratorService } from '../moderator.service';
import { ModeratorInfo } from '../moderator.dto';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private moderatorService: ModeratorService,
  ) {}

  // @Post('createReport')
  // @UsePipes(new ValidationPipe())
  // async createReport(@Body() reportDto: ReportsDto) {
  //   try {
  //     const user = await this.moderatorService.findModerator(reportDto.user);
  //     if (!user) {
  //       throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  //     }
  //     return await this.reportsService.createReport(reportDto);
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  @Get()
  async showAllReports() {
    try {
      return await this.reportsService.getReports();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('assignModerator/:id')
  async assignReport(
    @Param('id') id: number,
    @Body() updateReportDto: ReportsDto,
  ) {
    try {
      return await this.reportsService.assignReport(id, updateReportDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('updateReport/:id')
  async updateReport(
    @Param('id') id: number,
    @Body() updateReportDto: ReportsDto,
  ) {
    try {
      return await this.reportsService.updateReport(id, updateReportDto);
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
