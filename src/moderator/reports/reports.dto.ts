import { IsDate, IsIn, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class ReportsDto{


    report_id: number;

    @IsString()
    @IsNotEmpty()
    report_title: string;

    @IsString()
    @IsNotEmpty()
    report_user: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50, {message: "Subject is too long"})
    report_subject: string;

    @IsString()
    @MaxLength(1000, {message: "Description is too long"})
    report_description: string;

    // @IsDate()
    // @IsNotEmpty()
    // report_date: Date;

    @IsIn(["pending", "resolved", "processing", "rejected"])
    report_status: string;
}