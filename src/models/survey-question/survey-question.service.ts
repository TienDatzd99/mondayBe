/* eslint-disable prettier/prettier */
import { BadGatewayException, Injectable } from '@nestjs/common';
import { SurveyQuestionDto } from './dto/survey-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyQuestionEntity } from './entity/survey-question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyQuestionService {
    constructor(
        @InjectRepository(SurveyQuestionEntity)
        private surveyQuestionEntity: Repository<SurveyQuestionEntity>
    ) { }

    async create(surveyQuestionDto: SurveyQuestionDto) {
        try{
        const questionJson = JSON.stringify(surveyQuestionDto.answers);

        const newQuestion = this.surveyQuestionEntity.create({ ...surveyQuestionDto, answers: questionJson });
        await this.surveyQuestionEntity.save(newQuestion);
        }catch(err){
            throw new BadGatewayException(err);
        }
    }


    async getAllSurveyQuestions() {
        try {
            const ListQuestions = await this.surveyQuestionEntity.find();
            return ListQuestions.map((item) => {
                const answers = JSON.parse(item.answers);
                return { ...item, answers };
            });
        } catch (err) {
           throw new BadGatewayException(err);
        }
    }

    async updateSurveyQuestion(id: number, surveyQuestionDto: SurveyQuestionDto) {
        try {
            const questionJson = JSON.stringify(surveyQuestionDto.answers);
            const updateResult = await this.surveyQuestionEntity.update(id, { ...surveyQuestionDto, answers: questionJson });
            if (updateResult.affected === 0) {
                throw new BadGatewayException('No survey question found to update');
            }
            return updateResult;
        } catch (err) {
            throw new BadGatewayException(err);
        }
    }
    async deleteSurveyQuestion(id: number) {
        try {
            const deleteResult = await this.surveyQuestionEntity.delete(id);
            if (deleteResult.affected === 0) {
                throw new BadGatewayException('No survey question found to delete');
            }
            return deleteResult;
        } catch (err) {
            throw new BadGatewayException(err);
        }
    }

}