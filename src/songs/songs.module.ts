import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from '../common/constants/connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from 'src/artists/artists.entity';


// const mockSongsService = {
//   findAll(){
//     console.log(`🧾🧪 Use 'useValue' from 'mockSongsService'\n🔧 🧰 It works 🦾 🦿  !`)
//     return [{message: `🧾🧪 Use 'useValue' from 'mockSongsService'`, result: `🔧 🧰 It works 🦾 🦿  !`}]
//   }
// }

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongsController],
  providers: [
    SongsService,
    // {
    //   provide: SongsService,
    //   useClass: SongsService,
    // },
    // {
    //   provide: SongsService,
    //   useValue: mockSongsService,
    // },
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class SongsModule {}
