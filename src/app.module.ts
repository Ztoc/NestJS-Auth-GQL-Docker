import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { HelloModule } from './hello/hello.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { BookResolver } from './book/book.resolver';

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

  }), AuthModule, HelloModule, CacheModule.register({
    isGlobal: true,
    store: redisStore,
    host: 'redis',
    port: 6379,
  }), GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    playground: true,
    typePaths: ['./**/*.graphql'], // Specify the location of GraphQL files. It tells the server where to find our type definitions.
  }),
  BookResolver,],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule { }
