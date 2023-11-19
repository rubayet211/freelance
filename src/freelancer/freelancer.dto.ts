// freelancer.dto.ts
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';
import { Skill } from 'src/shared/entities/skills.entity';
import { Role } from 'src/shared/entities/user.entity';

export class CreateFreelancerDto {
  @IsArray()
  skills: Skill[];

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  hourlyRate: number;

  @IsString()
  @IsOptional()
  availability: string;
}

export class UpdateFreelancerDto {
  @IsArray()
  @IsOptional()
  skills?: Skill[];

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  hourlyRate?: number;

  @IsString()
  @IsOptional()
  availability?: string;
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  role: Role;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  picture?: string;
}
