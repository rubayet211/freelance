
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

