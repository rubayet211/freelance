import { IsOptional, IsString, IsNumber } from 'class-validator';

export class PatchAnnouncementDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsNumber()
  @IsOptional()
  moderatorId?: number;
}
