/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { GetTaskDto } from './dto/get-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: UserEntity): Promise<TaskEntity> {
    const task = this.tasksRepository.create({
      taskName: createTaskDto.taskName,
      groupName: createTaskDto.groupName,
      dueDate: new Date(createTaskDto.dueDate),
      status: createTaskDto.status || 'pending',
      owner: user,
    });
    return await this.tasksRepository.save(task);
  }

  async findAllByUser(user: UserEntity): Promise<TaskEntity[]> {
    return this.tasksRepository.find({ where: { owner: { id: user.id } } });
  }

  async findOneByUser(id: number, user: UserEntity): Promise<TaskEntity> {
    const task = await this.tasksRepository.findOne({
      where: { id, owner: { id: user.id } },
    });
    if (!task) {
      throw new NotFoundException(`Task với id ${id} không tồn tại hoặc không thuộc về bạn`);
    }
    return task;
  }

  // Bạn có thể thêm các phương thức khác như update, delete tùy nhu cầu
}