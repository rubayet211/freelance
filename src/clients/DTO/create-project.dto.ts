import { IsArray, IsString } from "class-validator";

export class CreateProjectDTO
{

    @IsString()
    projectTitle:string;

    @IsString()
    projectBudget:string;

    @IsString()
    projectDescription:string;
    
    @IsArray()
    Skills:string;
}