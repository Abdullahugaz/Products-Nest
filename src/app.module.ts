import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/users/entities/user.entity';
import { CustomersModule } from './modules/customers/customers.module';
import { Customer } from './modules/customers/entities/customer.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'mysql',
        host: cfg.get<string>('DB_HOST'),
        port: Number(cfg.get<string>('DB_PORT') ?? 3306),
        username: cfg.get<string>('DB_USER'),
        password: cfg.get<string>('DB_PASSWORD'),
        database: cfg.get<string>('DB_NAME'),
        ssl: cfg.get<string>('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
        entities: [User,Customer],
        synchronize: cfg.get<string>('DB_SYNC') === 'true', // dev only
        logging: cfg.get<string>('DB_LOGGING') === 'true',
        timezone: cfg.get<string>('DB_TIMEZONE') || 'Z',
        charset: cfg.get<string>('DB_CHARSET') || 'utf8mb4',
      }),
    }),
    UsersModule,
    AuthModule,
    CustomersModule,
  ],
})
export class AppModule {}
