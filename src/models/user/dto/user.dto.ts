/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from 'class-validator';

export class UserDto {
    @IsString()
    @ApiProperty()
    fullname: string;

    @IsString()
    @ApiProperty()
    password: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    accountName: string;
}
