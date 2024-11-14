/* eslint-disable prettier/prettier */

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('survey_user_answer')

export class surveyUserAnswerEntity {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    value: string;

    @Column()
    userId: number;

    @Column()
    surveyId: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.surveyUserAnswers)
    user: UserEntity;

}