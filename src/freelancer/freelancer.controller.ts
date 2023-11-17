import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  Req,
  Res,
  Patch,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FreelancerService } from './freelancer.service';
import { MulterError, diskStorage } from 'multer';
import { CreateFreelancerDto, UpdateFreelancerDto } from './freelancer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import * as fs from 'fs';
@Controller('freelancer')
export class FreelancerController {
  constructor(private freelancerService: FreelancerService) {}

  @Get('getProfilePicture')
  @UseGuards(JwtAuthGuard)
  async getProfilePicture(@Req() req, @Res() res) {
    try {
      const userId = req.user.userId;
      const fileName = await this.freelancerService.getProfilePicture(userId);

      // read buffer
      const fileBuffer = fs.readFileSync(fileName);

      // set headers and send the file
      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Content-Disposition', 'inline; filename=' + fileName);

      // buffer as the response
      res.status(200).end(fileBuffer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getFreelancerById(@Req() req, @Res() res) {
    try {
      const userId = req.user.userId;
      const freelancer = await this.freelancerService.getFreelancerById(userId);
      if (!freelancer) {
        return res.status(404).json({ message: 'Freelancer not found' });
      }
      res.status(200).json(freelancer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // @Put('updateFreelancer')
  // @UseGuards(JwtAuthGuard)
  // @UsePipes(new ValidationPipe())
  // async updateFreelancer(
  //   @Body(new ValidationPipe()) updateFreelancerDto: UpdateFreelancerDto,
  //   @Res() res,
  //   @Req() req,
  // ) {
  //   try {
  //     const userId = req.user.userId;

  //     if (!updatedFreelancer) {
  //       return res.status(404).json({ message: 'Freelancer not found' });
  //     }
  //     res.status(200).json(updatedFreelancer);
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // }

  @Post('addSkills')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async addSkills(@Body() skills: string[], @Req() req, @Res() res) {
    try {
      const freelancerId = req.user.freelancerId;
      const userId = req.user.userId;
      const result = await this.freelancerService.addSkillsToFreelancer(
        freelancerId,
        userId,
        skills,
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async deleteFreelancer(@Res() res, @Req() req) {
    try {
      const userId = req.user.userId;
      const result = await this.freelancerService.deleteFreelancer(userId);
      res.status(200).json({ message: 'Freelancer deleted', result: result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  @Patch('updateProfilePicture')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('profile', {
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
  uploadPhoto(@UploadedFile() profile: any, @Req() req, @Res() res) {
    try {
      const fileName = profile.filename;
      const userId = req.user.userId;
      this.freelancerService.uploadProfilePicture(userId, fileName);
      res.status(200).json({ message: 'Profile picture updated' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
