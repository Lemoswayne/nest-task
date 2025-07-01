import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { User } from 'src/user/entities/user.entity';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // 🔥 Aqui está a solução
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const user = await this.userRepository.findOne({
      where: { id: createBoardDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const board = this.boardRepository.create({
      ...createBoardDto,
      user,
    });

    return this.boardRepository.save(board);
  }

  async findAll(tokenPayload: TokenPayloadDto): Promise<Board[]> {
    return this.boardRepository.find({
      where: { user: { id: String(tokenPayload.sub) } },
      relations: ['tasks'],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findOne(id: string, tokenPayload: TokenPayloadDto): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }

  async update(
    id: string,
    updateBoardDto: UpdateBoardDto,
    tokenPayload: TokenPayloadDto,
  ): Promise<Board> {
    const board = await this.findOne(id, tokenPayload);
    const updated = Object.assign(board, updateBoardDto);
    return this.boardRepository.save(updated);
  }

  async remove(id: string, tokenPayload: TokenPayloadDto): Promise<void> {
    const board = await this.findOne(id, tokenPayload);
    await this.boardRepository.remove(board);
  }
}
