<<<<<<< HEAD
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
=======
import { IsEmail, IsEmpty, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class ModeratorInfo{
    
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    filename: string;

}
>>>>>>> 910df35d92918525d7ba4330603ce16e38877697
