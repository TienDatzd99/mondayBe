/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserEntity } from "../entities/user.entity";

/* eslint-disable prettier/prettier */
export class SurveyUserAnswerDto {

  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    value: string;
  
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    userId: number;
  
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    surveyId: number;
  
  
}