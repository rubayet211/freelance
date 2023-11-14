import { IsString, IsEmail, IsUUID, MinLength, IsStrongPassword, IsOptional, IsMimeType, IsNotEmpty, IsObject, IsDefined } from 'class-validator';

export class clientCredentials {

    // @IsString()
    // @MinLength(10)
    name: string;

    // @IsEmail()
    email: string;

    // @IsString()
    //@IsStrongPassword()
    password: string;

    // @IsString()
    type:string;

    // @IsOptional()
    // @IsUUID()
    UUID:string;

    Image:string;
    
}
    