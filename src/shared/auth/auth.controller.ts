import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateFreelancerDto } from './dto/create-freelancer.dto';
import { Role } from '../entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
@Controller('auth/freelancer')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async register(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    @Body(new ValidationPipe()) createFreelancerDto: CreateFreelancerDto,
    @Req() req,
    @Res() res,
  ) {
    try {
      createUserDto.role = Role.freelancer;

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const createUserWithHashedPasswordDto: CreateUserDto = {
        ...createUserDto,
        password: hashedPassword,
      };

      const result = await this.authService.signUp(
        createUserWithHashedPasswordDto,
        createFreelancerDto,
      );

      res.status(201).json({
        statusCode: 201,
        message: 'Freelancer created successfully',
        result,
      });
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  async login(
    @Body(new ValidationPipe()) loginDto: LoginDto,
    @Res() res,
    @Req() req,
  ) {
    try {
      const result = await this.authService.signIn(loginDto);

      if (!result) {
        throw new Error('User not found');
      }

      const user = result.user;

      const passwordMatch = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (!passwordMatch) {
        throw new Error('Invalid password');
      }

      const accessToken = await this.jwtService.signAsync(
        {
          userId: user.userId,
          username: user.username,
          freelancerId: result.freelancerId,
        },
        {
          secret: '3585a01c430586ddc5b54d19c579284c',
          expiresIn: '90d',
        },
      );

      res.cookie('token', accessToken, { httpOnly: true });

      res.status(200).json({
        statusCode: 200,
        message: 'Freelancer logged in successfully',
        accessToken,
        role: Role.freelancer,
      });
    } catch (error) {
      res.status(400).json({ statusCode: 400, message: error.message });
    }
  }
}
