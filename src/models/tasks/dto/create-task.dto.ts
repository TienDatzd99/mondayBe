/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @ApiProperty({ example: 'Phát triển tính năng mới', description: 'Tên của task' })
  taskName: string;

  @IsString()
  @ApiProperty({ example: 'Nhóm phát triển', description: 'Tên nhóm' })
  groupName: string;

  @IsDateString()
  @ApiProperty({ example: '2023-12-31', description: 'Ngày tới hạn của task' })
  dueDate: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'pending', description: 'Trạng thái của task', required: false })
  status?: string;
}