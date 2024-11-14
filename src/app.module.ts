/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { MySQLModule } from './provider/database/provider.module';
import { UserModule } from './models/user/user.module';
import { AuthModule } from './auth/auth.module';
import { SurveyQuestionModule } from './models/survey-question/survey-question.module';
import { TasksModule } from './models/tasks/tasks.module';


@Module({
  imports: [AppConfigModule, MySQLModule, UserModule, AuthModule,SurveyQuestionModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
