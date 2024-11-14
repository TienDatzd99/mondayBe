/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TasksService } from '../tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { TaskEntity } from '../entities/task.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard) // Bảo vệ toàn bộ controller
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Thêm một task mới' })
  @ApiResponse({ status: 201, description: 'Task được tạo thành công', type: TaskEntity })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: UserEntity
  ): Promise<TaskEntity> {
    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách các task của người dùng hiện tại' })
  @ApiResponse({ status: 200, description: 'Lấy danh sách thành công', type: [TaskEntity] })
  async findAll(@GetUser() user: UserEntity): Promise<TaskEntity[]> {
    return this.tasksService.findAllByUser(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin một task theo ID' })
  @ApiResponse({ status: 200, description: 'Lấy thông tin thành công', type: TaskEntity })
  @ApiResponse({ status: 404, description: 'Task không được tìm thấy' })
  async findOne(
    @Param('id') id: number,
    @GetUser() user: UserEntity
  ): Promise<TaskEntity> {
    return this.tasksService.findOneByUser(id, user);
  }
}