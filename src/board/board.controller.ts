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
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';

@Controller('boards')
// @UsePipes(ParseUUIDPipe)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.boardService.findOne(id, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.boardService.remove(id, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBoardDto: CreateBoardDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.boardService.update(id, updateBoardDto, tokenPayload);
  }
}
