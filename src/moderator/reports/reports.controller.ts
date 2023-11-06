import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsDto } from './reports.dto';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

@Post('createReport')
@UsePipes(new ValidationPipe())
createReport (@Body() report: ReportsDto){
    return this.reportsService.createReport(report);
}
}
