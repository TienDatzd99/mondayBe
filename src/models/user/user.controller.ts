/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SurveyUserAnswerDto } from './dto/survey-user-answer.dto';
import { LoginDto } from './dto/user-login.dto';


@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async createUser(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }

  @Post('create-survey-answer')
  @ApiBody({ type: [SurveyUserAnswerDto] })
  createSurveyQuestionUser(@Body() surveyUserAnswerDto: SurveyUserAnswerDto[]) {
    return this.userService.createSurveyUserAnswer(surveyUserAnswerDto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.userService.login(dto);
  }

}
