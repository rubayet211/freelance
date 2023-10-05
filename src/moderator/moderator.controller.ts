import { Controller, Get, Param } from '@nestjs/common';

@Controller('moderator')
export class ModeratorController {

    @Get('reports')
    getAllReports(): object{

        const reports = {id: 1};

        return reports;

    }

    @Get('reports/:id')
    getReport(@Param('id') reportID: string): object{
        const report={"id": reportID}
        return report;
    }

    
}
