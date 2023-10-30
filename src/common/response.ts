import {
  NestInterceptor,
  CallHandler,
  Injectable,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs';
import { Observable } from 'rxjs';

interface Data<T> {
  data: T;
}

//响应拦截器
@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Data<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          status: 0,
          message: 'succeed',
          success: true,
        };
      }),
    );
  }
}
