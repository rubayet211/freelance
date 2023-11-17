import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
  UploadedFile,
  Session,
  UseGuards,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { ModeratorService } from './moderator.service';
import { ModeratorInfo } from './moderator.dto';
import { ReportsEntity } from './reports/reports.entity';

@Controller('moderator')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}

  @Get()
  getModerator(): object {
    return this.moderatorService.getModerator();
  }

  @Post('createModerator')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('profilepic', {
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
      }),
    }),
  )
  createAdmin(
    @Body() moderatorInfo: ModeratorInfo,
    @Body() report: ReportsEntity,
    @UploadedFile() myfile: Express.Multer.File,
  ): object {
    moderatorInfo.filename = myfile.filename;
    return this.moderatorService.createModerator(moderatorInfo, report);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('profilepic', {
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
      }),
    }),
  )
  updateModerator(
    @Param('id') id: number,
    @Body() moderatorInfo: ModeratorInfo,
    @UploadedFile() myfile: Express.Multer.File,
  ): object {
    moderatorInfo.filename = myfile.filename;
    return this.moderatorService.updateModerator(id, moderatorInfo);
  }

  @Get(':id')
  getModeratorById(@Param('id', ParseIntPipe) id: number): object {
    return this.moderatorService.getModeratorById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('profilepic', {
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
      }),
    }),
  )
  updateSpecModerator(
    @Param('id') id: number,
    @Body() moderatorInfo: any,
    @UploadedFile() myfile: Express.Multer.File,
  ): Object {
    if (myfile) {
      moderatorInfo.filename = myfile.filename;
    }
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

  @Post('signin')
  async signIn(@Session() session, @Body() body: ModeratorInfo): Promise<any> {
    const user = await this.moderatorService.signIn(
      body.username,
      body.password,
    );
    if (user) {
      session.username = user.username;
      return { status: 'success' };
    } else {
      return { status: 'failed' };
    }
  }

  @Patch('assign-report')
  async assignReportToModerator(
    @Body('username') username: string,
    @Body('reportId') report: number,
  ) {
    return this.moderatorService.assignReportToModerator(username, report);
  }
}
