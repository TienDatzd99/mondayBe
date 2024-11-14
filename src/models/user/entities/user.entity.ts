/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { surveyUserAnswerEntity } from './survey-user-answer.entity';
import { TaskEntity } from 'src/models/tasks/entities/task.entity';


@Entity('user')

export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullname: string;


    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    accountName: string;

    @Column({default: true})
    isActive: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToMany(() => surveyUserAnswerEntity, (surveyUserAnswer) => surveyUserAnswer.user)
    surveyUserAnswers: surveyUserAnswerEntity[];

    @OneToMany(() => TaskEntity, (task) => task.user)
    createdTasks: TaskEntity[];
}
