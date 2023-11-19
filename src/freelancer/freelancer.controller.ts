import {
  Controller,
  Get,
  Param,
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
  Session,
} from '@nestjs/common';
import { FreelancerService } from './freelancer.service';
import { MulterError, diskStorage } from 'multer';
import { CreateFreelancerDto, UpdateFreelancerDto } from './freelancer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import * as fs from 'fs';
import * as session from 'express-session';
@Controller('freelancer')
export class FreelancerController {
  constructor(private freelancerService: FreelancerService) {}

  @Get('getProfilePicture')
  @UseGuards(JwtAuthGuard)
  async getProfilePicture(@Req() req, @Res() res) {
    try {
      const userId = req.user.userId;
      const fileName = await this.freelancerService.getProfilePicture(userId);

      const fileBuffer = fs.readFileSync(fileName);

      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Content-Disposition', 'inline; filename=' + fileName);

      res.status(200).end(fileBuffer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  @Delete('deleteProfilePicture')
  @UseGuards(JwtAuthGuard)
  async deleteProfilePicture(@Req() req, @Res() res) {
    try {
      const userId = req.user.userId;
      const fileName = await this.freelancerService.getProfilePicture(userId);

      await this.freelancerService.deleteProfilePicture(userId);
      fs.unlinkSync(fileName);

      res.status(200).json({ message: 'Profile picture deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  @Delete('deleteSkill/:id')
  @UseGuards(JwtAuthGuard)
  async deleteSkill(@Req() req, @Res() res, @Param('id') skill: number) {
    try {
      const skillId = skill;
      const result = await this.freelancerService.deleteSkill(skill);
      res.status(200).json({ result: result });
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

  @Get('search/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getFreelancerByIdParam(
    @Req() req,
    @Res() res,
    @Param('id') UserId: number,
  ) {
    try {
      const userId = UserId;
      const freelancer =
        await this.freelancerService.getFreelancerByIdParam(userId);
      if (!freelancer) {
        return res.status(404).json({ message: 'Freelancer not found' });
      }
      res.status(200).json(freelancer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  @Get('viewProjects')
  async getProjects(@Req() req, @Res() res) {
    try {
      const projects = await this.freelancerService.getProjects();
      if (!projects) {
        return res.status(404).json({ message: 'Something went wrong' });
      }
      res.status(200).json(projects);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  @Get('viewProject/:id')
  async getProjectsById(@Req() req, @Res() res, @Param('id') id: number) {
    try {
      const projects = await this.freelancerService.getProjectsById(id);
      if (!projects) {
        return res.status(404).json({ message: 'Something went wrong' });
      }
      res.status(200).json(projects);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  @Get('projectByTitle/:title')
  async getProjectsByTitle(
    @Req() req,
    @Res() res,
    @Param('title') title: string,
  ) {
    try {
      const projects =
        await this.freelancerService.findSimilarProjectsByTitle(title);
      if (!projects) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.status(200).json(projects);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  @Get('projectBySkill/:skill')
  async getProjectsBySkill(
    @Req() req,
    @Res() res,
    @Param('skill') skill: string,
  ) {
    try {
      const projects = await this.freelancerService.getProjectsBySkill(skill);
      if (!projects) {
        return res.status(404).json({ message: 'Something went wrong' });
      }
      res.status(200).json(projects);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

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

  @Get('getSession')
  getSession(@Req() req, @Res() res, @Session() session) {
    try {
      const session = req.session;
      res.status(200).json({ session: session });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
