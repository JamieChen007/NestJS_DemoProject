import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';
import { GuardModule } from './guard/guard.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqltestModule } from './mysqltest/mysqltest.module';
import { ManagerModule } from './manager/manager.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', //数据库类型
      username: 'root', //账号
      password: 'root', //密码
      host: 'localhost', //host
      port: 3306,
      database: 'nestjs', //库名
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
      synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: 59, //重试连接数据库间隔
      retryAttempts: 1, //重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体}),
    }),
    UserModule,
    UploadModule,
    LoginModule,
    GuardModule,
    MysqltestModule,
    ManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('/v1/user');
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: '/v1/user', method: RequestMethod.POST });
    consumer.apply(LoggerMiddleware).forRoutes(AppController);
  }
}
