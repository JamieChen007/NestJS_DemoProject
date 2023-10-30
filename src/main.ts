import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { NextFunction } from 'express';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from './common/response';
import { HttpFilter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';
// import { RoleGuard } from './guard/role/role.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const whitelist = ['/v1/user'];

// clarify a global middleware
function MiddleWareAll(req: any, res: any, next: NextFunction) {
  console.log('global middleware run on ', req.originalUrl);
  // if (whitelist.includes(req.originalUrl)) {
  //   next();
  // } else {
  //   res.send('sasasa');
  // }
  next();
}

async function bootstrap() {
  //静态资源访问需要加NestExpressApplication泛型
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //静态资源访问
  app.useStaticAssets(join(__dirname, 'images'), {
    //前缀
    prefix: '/picture',
  });

  //响应拦截器
  app.useGlobalInterceptors(new Response());

  //管道验证DTO
  app.useGlobalPipes(new ValidationPipe());

  //异常拦截器
  // app.useGlobalFilters(new HttpFilter());

  //全局守卫
  // app.useGlobalGuards(new RoleGuard());

  app.enableVersioning({
    type: VersioningType.URI,
  });
  // call global middleware
  app.use(cors());
  app.use(MiddleWareAll);
  app.use(
    session({
      secret: 'jamie',
      rolling: true,
      name: 'jamie.sid',
      cookie: { maxAge: 99999999 },
    }),
  );

  //Swagger
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('jamie title')
    .setDescription('jamie desc')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
