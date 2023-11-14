import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
