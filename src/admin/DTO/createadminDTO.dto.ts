import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDTO
{
    @IsString()
    Name: string;

    @IsEmail()
    Email:string;

    @IsString()
    @IsNotEmpty()
    Password:string;
    
    Image:string;
}