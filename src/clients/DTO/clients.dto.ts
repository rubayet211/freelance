import { Optional } from '@nestjs/common';
import { IsString, IsEmail, IsNumber } from 'class-validator';

export class clientCredentials {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    type:string;

    @IsNumber()
    id:number

    UUID?:string

    }
    