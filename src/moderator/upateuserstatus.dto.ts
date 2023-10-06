import { IsIn } from 'class-validator';

export class UpdateUserStatusDto {

    @IsIn(['active', 'inactive', 'banned'])
    status: string;
}