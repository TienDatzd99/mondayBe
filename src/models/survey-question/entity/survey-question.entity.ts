/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('survey_question')
export class SurveyQuestionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    questionTitle: string;


    @Column()
    answers: string;


    
    // @Column()
    // type: string;

    // @OneToMany(() => SurveyQuestionOptionEntity, (option) => option.surveyQuestion)
    // options: SurveyQuestionOptionEntity[];

    // @ManyToOne(() => SurveyEntity, (survey) => survey.questions)
    // survey: SurveyEntity;
}