import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
  UploadedFile,
  Session,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { ModeratorService } from './moderator.service';
import { ModeratorInfo } from './moderator.dto';
import { ReportsEntity } from './reports/reports.entity';
import { ReportsDto } from './reports/reports.dto';
import { SessionGuard } from './session.guard';

@Controller('moderator')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}

  @Get()
  @UseGuards(SessionGuard)
  async getModerator(@Session() session): Promise<object> {
    try {
      return await this.moderatorService.getModerator();
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Post('createModerator')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('profilepic', {
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
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
  createModerator(
    @Body() moderatorInfo: ModeratorInfo,
    @Body() report: ReportsEntity,
    @UploadedFile() myfile: Express.Multer.File,
  ): object {
    moderatorInfo.filename = myfile.filename;
    return this.moderatorService.createModerator(moderatorInfo, report);
  }

  @Put(':id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('profilepic', {
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 300000,
      },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now().toString() + file.originalname);
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
  @UseGuards(SessionGuard)
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
          cb(null, Date.now().toString() + file.originalname);
        },
      }),
    }),
  )
  @UseGuards(SessionGuard)
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
  @UseGuards(SessionGuard)
  findModerator(@Param('username') username: string): object {
    return this.moderatorService.findModerator(username);
  }

  @Post('signin')
  async signIn(@Session() session, @Body() body: ModeratorInfo): Promise<any> {
    try {
      const user = await this.moderatorService.signIn(
        body.username,
        body.password,
      );
      if (user) {
        session.username = user.username;
        return { status: 'success' };
      } else {
        throw new HttpException(
          'Invalid username or password',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
