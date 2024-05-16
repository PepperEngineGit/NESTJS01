import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import {LoggerMiddleware} from "./common/middlewares/logger.middleware";
import {SongsController} from "./songs/songs.controller";
import {DevConfigService} from "./common/providers/devConfigService";
import * as process from "node:process";
import { TypeOrmModule } from '@nestjs/typeorm';
import {Playlist} from "./playlists/playlists.entity";
import {User} from "./users/user.entity";
import {Artist} from "./artists/artists.entity";
import {Song} from "./songs/song.entity";

const devConfig = {port: 3000}
const proConfig = {port: 8080}

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    database: 'spotify-clone',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '!!sas44hazUU',
    entities: [Song, Artist, User, Playlist],
    synchronize: true,
  }),
    SongsModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: DevConfigService,
    useClass: DevConfigService,
  },
    {
      provide: 'CONFIG',
      useFactory: () => {
        console.log(`process`, process.env.NODE_ENV)
        return process.env.NODE_ENV === 'production' ? proConfig : devConfig;
      }
    }],
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
