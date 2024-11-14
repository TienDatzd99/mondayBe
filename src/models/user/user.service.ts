/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { SurveyUserAnswerDto } from './dto/survey-user-answer.dto';
import { surveyUserAnswerEntity } from './entities/survey-user-answer.entity';
import { LoginDto } from './dto/user-login.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private configService: ConfigService,
        @InjectRepository(surveyUserAnswerEntity)
        private surveyUserAnswerRepository: Repository<surveyUserAnswerEntity>,
    ) { }

    async create(dto: UserDto): Promise<UserEntity> {

        const checkExist = await this.findUserbyEmail(dto.email);
        if (checkExist) {
            throw new BadRequestException('Email already exists');
        }


        const newPassword = await bcrypt.hash(dto.password, Number(this.configService.get('SALT')));


        const newUser = this.userRepository.create({ ...dto, password: newPassword });
        await this.userRepository.save(newUser);
        delete newUser.password;


        return newUser;
    }

    async findUserbyEmail(email: string): Promise<UserEntity> {
        return this.userRepository.findOne({ where: { email } });
    }

    async createSurveyUserAnswer(surveyUserAnswerDto: SurveyUserAnswerDto[]) {
        try {
            const listAnswer = this.surveyUserAnswerRepository.create(surveyUserAnswerDto);
            await this.surveyUserAnswerRepository.save(listAnswer);
            return "Luu tru thanh cong";
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

   
  async login(dto: LoginDto): Promise<any> {
    const user = await this.findUserbyEmail(dto.email);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    // Return user data or JWT token as per your authentication strategy
    return { message: 'Login successful', user };
  }
}