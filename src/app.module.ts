import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import {LoggerMiddleware} from "./common/middlewares/logger.middleware";
import {SongsController} from "./songs/songs.controller";

@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerMiddleware)
        //.forRoutes('songs');
        //.forRoutes({path: 'songs', method: RequestMethod.POST});
        .forRoutes(SongsController);
  }
}
