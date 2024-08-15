import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgreSQLConfig } from '../configs/postgresql.config';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: PostgreSQLConfig,
      inject: [ConfigService],
    }),
    ArticleModule,
  ],
})
export class AppModule {}
