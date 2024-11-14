/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from 'src/stragety/google.strategy';
import { UserService } from 'src/models/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/user/entities/user.entity';
import { GoogleAuthGuard } from './google-auth.guard';
import { surveyUserAnswerEntity } from 'src/models/user/entities/survey-user-answer.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PassportModule, ConfigModule,TypeOrmModule.forFeature([UserEntity,surveyUserAnswerEntity]),
  JwtModule.register({
    secret: 'your_jwt_secret_key', // Thay bằng secret key của bạn
    signOptions: { expiresIn: '1h' },
  }),

], // Add ConfigModule to imports
  providers: [AuthService, GoogleStrategy, UserService , GoogleAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}