/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SurveyQuestionService } from './survey-question.service';
import { SurveyQuestionDto } from './dto/survey-question.dto';
import {  ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('survey-question')
@ApiTags('survey-question')
export class SurveyQuestionController {
  constructor(private readonly surveyQuestionService: SurveyQuestionService) {} 
  @Post()
  createSurvey(@Body() surveyQuestionDto: SurveyQuestionDto) {
    return this.surveyQuestionService.create(surveyQuestionDto);
  }

  @Get()
  getAllServeyQuestions() {
    return this.surveyQuestionService.getAllSurveyQuestions();
  }

  @Put(':id')
  @ApiParam({ 
    name: 'id', type: String
   })
  updateSurveyQuestion(@Param('id', new ParseIntPipe()) id: number , @Body() surveyQuestionDto: SurveyQuestionDto) {
    return this.surveyQuestionService.updateSurveyQuestion(id, surveyQuestionDto);
  }


  @Delete(':id')
  @ApiParam({ 
    name: 'id', type: String,
    description: 'Delete survey question by id'
   })
  deleteSurveyQuestion(@Param('id', new ParseIntPipe()) id: number) {
    return this.surveyQuestionService.deleteSurveyQuestion(id);
  }
}
