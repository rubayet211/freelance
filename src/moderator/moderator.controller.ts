import { Body, Controller, Get, Param, Post, Put, Patch } from "@nestjs/common";
import { UpdateUserDto } from "./updateuser.dto";
import { UpdateUserStatusDto } from './upateuserstatus.dto';

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

    @Get('users/:id')
    getUser(@Param('id') userID: number): object {
        const user = { "User number": userID }
        return user;
    }

    @Put('users/:id')
    updateUser(@Param('id') userId: number, @Body() updateUserDto: UpdateUserDto) {
        const updateUser = this.updateUser(userId, updateUserDto);
        return updateUser;
    }

    @Patch('users/:id/status')
    updateStatus(@Param('id') userId: string, @Body() updateUserStatusDto: UpdateUserStatusDto,) {

        const updatedUserStatus = {
            id: userId,
            status: updateUserStatusDto.status,
        };
        return updatedUserStatus;
    }









}
