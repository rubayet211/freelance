import { Body, Controller, Get, Param, Post, Put, Patch, Delete, Query, ParseIntPipe, ValidationPipe, UsePipes, UseInterceptors, UploadedFile } from "@nestjs/common";
import { UpdateUserDto } from "./updateuser.dto";
import { ReportDto } from "./reports.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { ModeratorEntity } from "./moderator.entity";
import { ModeratorService } from "./moderator.service";
import { ModeratorInfo } from "./moderator.dto";

@Controller('moderator')
export class ModeratorController {
    constructor(private readonly moderatorService: ModeratorService) { }

    @Get()
    getModerator(): object {
        return this.moderatorService.getModerator();
    }

    @Post('createModerator')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('profilepic',
        {
            fileFilter: (req, file, cb) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    return cb(new Error('Only image files are allowed!'), false);
                }
                cb(null, true);
            },
            limits: {
                fileSize: 300000,
            },
            storage: diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname);
                },
            },
            ),
        },),)
    createAdmin(@Body() moderatorInfo: ModeratorInfo, @UploadedFile() myfile: Express.Multer.File): object {
        moderatorInfo.filename = myfile.filename;
        return this.moderatorService.createModerator(moderatorInfo);
    }


    @Put(':id')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('profilepic',
        {
            fileFilter: (req, file, cb) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    return cb(new Error('Only image files are allowed!'), false);
                }
                cb(null, true);
            },
            limits: {
                fileSize: 300000,
            },
            storage: diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname);
                },
            },
            ),
        },),)
    updateModerator(@Param('id') id: number, @Body() moderatorInfo: ModeratorInfo, @UploadedFile() myfile: Express.Multer.File): object {
        moderatorInfo.filename = myfile.filename;
        return this.moderatorService.updateModerator(id, moderatorInfo);
    }

    @Get(':id')
    getModeratorById(@Param('id', ParseIntPipe) id: number): object {
        return this.moderatorService.getModeratorById(id);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('profilepic',
        {
            fileFilter: (req, file, cb) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    return cb(new Error('Only image files are allowed!'), false);
                }
                cb(null, true);
            },
            limits: {
                fileSize: 300000,
            },
            storage: diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname);
                },
            },
            ),
        },),)
        updateSpecModerator(@Param('id') id: number, @Body() moderatorInfo: any, @UploadedFile() myfile: Express.Multer.File): Object {
            moderatorInfo.filename = myfile.filename;
            return this.moderatorService.updateSpecModerator(id, moderatorInfo);
          }

    @Delete(':id')
    deleteModerator(@Param('id') id: number): object {
        return this.moderatorService.deleteModerator(id);
    }

    @Get('find/:username')
    findModerator(@Param('username') username: string): object {
        return this.moderatorService.findModerator(username);
    }


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

    @Post('reports')
    @UsePipes(new ValidationPipe())
    postReport(@Body() report: ReportDto): object {
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
    getUser(@Param('id', ParseIntPipe) userID: number): object {
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

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @UseInterceptors(FileInterceptor('file',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 30000 },
            storage: diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }





}
