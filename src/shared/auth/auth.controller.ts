// import {
//   Body,
//   Controller,
//   Post,
//   Req,
//   Res,
//   UsePipes,
//   ValidationPipe,
// } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { CreateFreelancerDto } from './dto/create-freelancer.dto';
// import { Role } from '../entities/user.entity';
// import { LoginDto } from './dto/login.dto';
// import { JwtService } from '@nestjs/jwt';

// @Controller('auth/freelancer')
// export class AuthController {
//   constructor(
//     private authService: AuthService,
//     private jwtService: JwtService,
//   ) {}

//   @Post('signup')
//   @UsePipes(new ValidationPipe())
//   async register(
//     @Body(new ValidationPipe()) createUserDto: CreateUserDto,
//     @Body(new ValidationPipe()) createFreelancerDto: CreateFreelancerDto,
//     @Req() req,
//     @Res() res,
//   ) {
//     try {
//       createUserDto.role = Role.freelancer;
//       const result = await this.authService.signUp(
//         createUserDto,
//         createFreelancerDto,
//       );
//       res.status(201).json({
//         statusCode: 201,
//         message: 'Freelancer created succesfully',
//         result,
//       });
//     } catch (error) {
//       res.status(400).json(error.message);
//     }
//   }

//   @Post('signin')
//   @UsePipes(new ValidationPipe())
//   async login(
//     @Body(new ValidationPipe()) loginDto: LoginDto,
//     @Res() res,
//     @Req() req,
//   ) {
//     try {
//       const result = await this.authService.signIn(loginDto);
//       if (!result) {
//         throw new Error('User not found');
//       }
//       const user = result.user;
//       const accessToken = await this.jwtService.signAsync(
//         {
//           userId: user.userId,
//           username: user.username,
//           freelancerId: result.freelancerId,
//         },
//         {
//           secret: '3585a01c430586ddc5b54d19c579284c',
//           expiresIn: '90d',
//         },
//       );
//       res.cookie('token', accessToken, { httpOnly: true });
//       res.status(200).json({
//         statusCode: 200,
//         message: 'Freelancer logged in succesfully',
//         accessToken,
//       });
//     } catch (error) {
//       res.status(400).json({ statusCode: 400, message: error.message });
//     }
//   }
//   //moved to freelancer.controller.ts
//   // @Get('getById/:id')
//   // async getFreelancerById(
//   //   @Param('id', ParseIntPipe) id: number,
//   //   @Req() req,
//   //   @Res() res,
//   // ) {
//   //   try {
//   //     const freelancer = await this.authService.getFreelancerById(id);
//   //     if (!freelancer) {
//   //       return res.status(404).json({ message: 'Freelancer not found' });
//   //     }
//   //     res.status(200).json(freelancer);
//   //   } catch (error) {
//   //     console.log({ message: error.message });
//   //   }
//   // }
// }
