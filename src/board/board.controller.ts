import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardService } from './board.service';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';

@Controller('boards')
// @UsePipes(ParseUUIDPipe)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(AuthTokenGuard)
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @UseGuards(AuthTokenGuard)
  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @UseGuards(AuthTokenGuard)
  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.boardService.findOne(id, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.boardService.remove(id, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBoardDto: CreateBoardDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.boardService.update(id, updateBoardDto, tokenPayload);
  }
}
