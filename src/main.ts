import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { TransformInterceptor } from './interceptors/transforrm.interceptor';
import { HttpExceptionFilter } from './filters/http.exception.filters';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minutes
      max: 1000, // limit each IP to 1000 requests per windowMs
    }),
  );
  app.use(helmet());
  app.use(compression());
  app.useGlobalInterceptors(new TransformInterceptor()); //正常情况下响应值统一
  app.useGlobalFilters(new HttpExceptionFilter()); //异常情况下响应统一
  await app.listen(3003);
}
bootstrap();
