import { IsEmail, IsNotEmpty } from "class-validator"

export class AdminLoginDto
{
    @IsEmail()
    Email : string

    @IsNotEmpty()
    Password : string
}