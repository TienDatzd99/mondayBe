/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

class SurveyQuestionAnswer{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    value: string;
}


export class SurveyQuestionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    questionTitle: string;


    @ApiProperty({type: SurveyQuestionAnswer, default: [
        {name: 'Yes', value: 'yes'},
       
    ]})
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => SurveyQuestionAnswer)
    answers: string;


 
}