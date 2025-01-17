/* eslint-disable unicorn/prefer-module */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { IDatabase, IRollbar } from './common/configuration';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';
import { LoggerModule as LoggerRollbarModule } from 'nestjs-rollbar';
import { UsersModule } from './modules/users/users.module';
import { ChatsModule } from './modules/chats/chats.module';
import { MessagesModule } from './modules/messages/messages.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env${process.env.NODE_ENV === 'development' ? '.development' : ''}`],
      load: [configuration],
    }),
    LoggerRollbarModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<IRollbar>('rollbar');
        return {
          accessToken: config.token,
          environment: config.envorement,
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        const config = configService.get<IDatabase>('database');
        return {
          type: 'postgres',
          timezone: 'Z',
          namingStrategy: new SnakeNamingStrategy(),
          bigNumberStrings: false,
          legacySpatialSupport: false,
          cache: false,
          ssl: false,
          migrationsRun: false,
          autoLoadEntities: true,
          synchronize: true,
          logging: ['error'],
          maxQueryExecutionTime: 10_000,
          requestTimeout: 30_000,
          pool: {
            max: 500,
          },
          options: {
            useUTC: true,
            encrypt: false,
            trustServerCertificate: true,
          },
          ...config.postgres,
        } as TypeOrmModuleOptions;
      },
      dataSourceFactory: async options => {
        return await new DataSource(options).initialize();
      },
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    ChatsModule,
    MessagesModule,
  ],
})
export class AppModule {}
