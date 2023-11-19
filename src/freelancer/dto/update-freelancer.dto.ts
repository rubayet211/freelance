import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class updateDto {
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

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  skills: string[];

  @IsNotEmpty()
  @IsNumber()
  hourlyRate: number;
}
