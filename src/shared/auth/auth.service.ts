import * as bcrypt from 'bcryptjs';
import { CreateFreelancerDto } from './dto/create-freelancer.dto';
import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Freelancer } from '../entities/freelancer.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Skill } from '../entities/skills.entity';
import * as nodemailer from 'nodemailer';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Freelancer)
    private readonly freelancerRepository: Repository<Freelancer>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async signUp(userDto: CreateUserDto, freelancerDto: CreateFreelancerDto) {
    const check = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    if (check) {
      throw new Error('Email already exists');
    }
    if (check.username === userDto.username) {
      throw new Error('Username is taken, Please try again');
    }

    const newUser = await this.userRepository.save(userDto);
    const { password, ...userResult } = newUser;

    const newFreelancer = this.freelancerRepository.create({
      skills: freelancerDto.skills.map((skillName) => ({ name: skillName })),
      hourlyRate: freelancerDto.hourlyRate,
      user: newUser,
    });

    const savedFreelancer = await this.freelancerRepository.save(newFreelancer);
    if (newUser && savedFreelancer) {
      const emailContent = `
                <html>
                  <body>
                    <h1>Welcome to Freelance Site</h1>
                    <p>Thank you for registering with us.</p>
                    <p>If you have any questions or need assistance, feel free to contact our support team.</p>
                    <p>Best regards,<br>Freelance Team</p>
                  </body>
                </html>
              `;
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'abdulhayee5767@gmail.com',
          pass: 'fxcsmaoautdmwesy',
        },
      });
      const mailOptions = {
        from: 'abdulhayee5767@gmail.com',
        to: newUser.email,
        subject: `Welcome abroad! ` + newUser.username,
        html: emailContent,
      };
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return {
            message: 'Invalid Request',
          };
        } else {
          return {
            message: 'OTP Sent Successfully',
            email: newUser.email,
          };
        }
      });
    }

    return savedFreelancer;
  }

  async signIn(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const freelancer = await this.freelancerRepository.findOne({
      where: { user: user },
    });
    if (!freelancer) {
      throw new Error('Freelancer not found');
    }
    return { user: user, ...freelancer };
  }
}
