/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { surveyUserAnswerEntity } from './entities/survey-user-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,surveyUserAnswerEntity])],
  controllers: [UserController],
  providers: [UserService, ConfigService],
})
export class UserModule {}
