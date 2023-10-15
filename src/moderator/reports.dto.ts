import { IsString, IsInt, IsDate, IsEmail, IsNotEmpty, IsIn, Matches, IsBoolean, MAX_LENGTH } from 'class-validator';

export class ReportDto {

  @IsNotEmpty()
  @Matches(/^r\d{4}$/, {
    message: 'id must start with r and be followed by exactly 4 digits'
  })
  id: string;

  @IsNotEmpty()
  title: string;



  @IsInt()
  @IsNotEmpty()
  userid: number;

  @IsIn(['resolved', 'in progress', 'received', 'terminated'])
  status: string;
}