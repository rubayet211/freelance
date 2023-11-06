import { IsNotEmpty, IsString, Length } from "class-validator";

export class AnnouncementDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 20, {message: "Title is too long"})  // Set your desired min and max length here
    title: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 150, {message: "Description is too long"})  // Set your desired min and max length here
    description: string;
}
