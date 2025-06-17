// src/task/task.service.ts
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Board } from 'src/board/entities/board.entity';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>, // Importando o repositório de Board
  ) {}

  async create(createTaskDto: CreateTaskDto, tokenPayload: TokenPayloadDto) {
    const board = await this.boardRepository.findOne({
      where: { id: createTaskDto.boardId },
      relations: ['user'],
    });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    if (board.user.id !== String(tokenPayload.sub)) {
      throw new ForbiddenException('Você não pode criar tarefas neste quadro.');
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

  async findOne(id: string, tokenPayload: TokenPayloadDto): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['board', 'board.user'],
    });
    if (!task) throw new NotFoundException('Task not found');

    if (String(task.board.user.id) !== String(tokenPayload.sub)) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar esta tarefa.',
      );
    }

    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    tokenPayload: TokenPayloadDto,
  ): Promise<Task> {
    const task = await this.findOne(id, tokenPayload);
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

  async remove(id: string, tokenPayload: TokenPayloadDto): Promise<void> {
    const task = await this.findOne(id, tokenPayload);
    await this.taskRepository.remove(task);
  }
}
