import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ModeratorEntity } from '../moderator.entity';

export class ReportsDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50, { message: 'Title is too long' })
  title: string;

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'Subject is too long' })
  subject: string;

  @IsString()
  @MaxLength(1000, { message: 'Description is too long' })
  description: string;

  @IsIn(['pending', 'resolved', 'processing', 'rejected'])
  status: string;

  @IsOptional()
  moderatorId: number;
}
