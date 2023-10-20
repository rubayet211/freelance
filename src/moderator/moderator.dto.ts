import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ModeratorDto {
    id: number;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(4)
    password: string;
}
