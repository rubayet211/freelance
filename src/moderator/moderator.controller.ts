import { Body, Controller, Get, Param, Post, Put, Patch, Delete, Query } from "@nestjs/common";
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
        const updateUser = {
            id: userId,
            userType: updateUserDto.userType,
            userBio: updateUserDto.userBio,
        };
        return updateUser;
    }

    @Patch('users/:id/status')
    updateStatus(@Param('id') userId: string, @Body() status) {


        return { "User ID": userId, "Status": status.status };
    }

    @Delete('users/:id')
    deleteUser(@Param('id') userId: number) {
        return { 'User has been deleted': userId };
    }

    @Post('announcements')
    postAnnouncement(@Body() announce: string) {
        return announce;
    }

    @Post('announcements/:announcementID')
    announceSpecificId(@Param('announcementID') announceId: number, @Body() newAnnouncement): any {
        const announcement = { announceId, announcement: newAnnouncement };
        return announcement;
    }

    @Get('search')
    searchPost(@Query('keyword') keyword: string) {
        return { 'keyword': keyword };
    }

    @Delete('announcements/:announcementID')
    deleteAnnouce(@Param('announcementID') announceId: number) {
        return { 'Announcement has been deleted': announceId };
    }





}
