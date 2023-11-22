import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class UpdateReportDto {
  title: string;

  subject: string;

  description: string;

  @IsIn(['pending', 'resolved', 'processing', 'rejected'])
  status: string;
}
