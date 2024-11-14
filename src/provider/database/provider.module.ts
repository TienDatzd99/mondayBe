/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// import { Controller } from './.controller';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MySqlConfigModule } from 'src/config/database/mysql/config.module';
import { MySqlConfigService } from 'src/config/database/mysql/config.service';
import { SurveyQuestionEntity } from 'src/models/survey-question/entity/survey-question.entity';
import { surveyUserAnswerEntity } from 'src/models/user/entities/survey-user-answer.entity';
import { UserEntity } from 'src/models/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forRootAsync({
    imports: [MySqlConfigModule],
    useFactory: (mysqlConfig: MySqlConfigService) => ({
      type: 'mysql',
      host: mysqlConfig.host,
      port: mysqlConfig.port,
      username: mysqlConfig.username,
      password: mysqlConfig.password,
      database: mysqlConfig.database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    inject: [MySqlConfigService],
  } as TypeOrmModuleOptions),
  TypeOrmModule.forFeature([UserEntity]),
],
})
export class MySQLModule {}