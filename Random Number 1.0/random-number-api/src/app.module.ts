import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RandomController } from './random/random.controller';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [],
  controllers: [RandomController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');  // Aplica el middleware a todas las rutas
  }
}
