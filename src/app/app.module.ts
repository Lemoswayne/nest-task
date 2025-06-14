import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { BoardModule } from 'src/board/board.module';
import { TaskModule } from 'src/task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import appConfig from './app.config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forFeature(appConfig),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      inject: [appConfig.KEY],
      useFactory: (appConfigurations: ConfigType<typeof appConfig>) => ({
        type: appConfigurations.database.type,
        host: appConfigurations.database.host,
        port: appConfigurations.database.port || 5432,
        username: appConfigurations.database.username,
        database: appConfigurations.database.database,
        password: appConfigurations.database.password,
        autoLoadEntities: Boolean(appConfigurations.database.autoLoadEntities),
        synchronize: Boolean(appConfigurations.database.synchronize), // Desligar em produção
      }),
    }),
    UserModule,
    BoardModule,
    TaskModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
