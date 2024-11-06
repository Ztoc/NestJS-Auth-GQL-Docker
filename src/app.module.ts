import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { HelloModule } from './hello/hello.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
    synchronize: true,

  }), AuthModule, HelloModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule { }
