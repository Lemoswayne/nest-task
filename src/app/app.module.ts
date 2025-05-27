import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { BoardModule } from 'src/board/board.module';
import { TaskModule } from 'src/task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { Board } from 'src/board/entities/board.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'postgres',
      password: '123456',
      entities: [Task, User, Board],
      autoLoadEntities: true, // Carrega automaticamente as entidades
      synchronize: true, // Sincroniza o banco de dados com as entidades (não recomendado para produção)
    }),
    UserModule,
    BoardModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
