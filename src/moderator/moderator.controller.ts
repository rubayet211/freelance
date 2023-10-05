import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller('moderator')
export class ModeratorController {

    @Get('reports')
    getAllReports(): object {

        const reports = { id: 1 };

        return reports;

    }

    @Get('reports/:id')
    getReport(@Param('id') reportID: number): object {
        const report = { "Report number": reportID }
        return report;
    }

    @Post('reports/resolve')
    resolveReport(@Body() reportID: number) {
        return reportID;
    }

    @Get('users')
    getAllUsers(): object {

        const users = { id: 1, type: "freelancer" };

        return users;

    }









}
