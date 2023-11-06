import { IsDate, IsNotEmpty, Max } from "class-validator";

export class AnnouncementDto {

    @IsNotEmpty()
    @Max(10, {message: "title is too long"})
    title: string;
    @IsNotEmpty()
    @Max(100, {message: "description is too long"})
    description: string;
    @IsNotEmpty()
    @IsDate()
    created_at: Date;
    @IsDate()
    @IsDate()
    updated_at: Date;
}