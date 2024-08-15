import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
export const PostgreSQLConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get('POSTGRESQL_HOST'),
    port: configService.get('POSTGRESQL_PORT'),
    username: configService.get('POSTGRESQL_USERNAME'),
    password: configService.get('POSTGRESQL_PASSWORD'),
    database: configService.get('POSTGRESQL_DATABASE'),
    entities: [User],
    synchronize: true,
  };
};
