import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Board } from 'src/board/entities/board.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>, // Importando o repositório de Board
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const board = await this.boardRepository.findOne({
      where: { id: createTaskDto.boardID },
    });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    const task = this.taskRepository.create({
      ...createTaskDto,
      board,
    });

    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: ['board'],
    });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['board'],
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    const updated = Object.assign(task, updateTaskDto);
    return this.taskRepository.save(updated);
  }

  async updateStatus(id: string, status: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    task.status = status;
    await this.taskRepository.save(task);

    return task;
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }
}
