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

export class DeleteModDto {
  title: string;

  subject: string;

  description: string;

  @IsIn(['pending', 'resolved', 'processing', 'rejected'])
  status: string;
}
