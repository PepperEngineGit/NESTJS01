 import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

// const mockSongsService = {
//   findAll(){
//     console.log(`🧾🧪 Use 'useValue' from 'mockSongsService'\n🔧 🧰 It works 🦾 🦿  !`)
//     return [{message: `🧾🧪 Use 'useValue' from 'mockSongsService'`, result: `🔧 🧰 It works 🦾 🦿  !`}]
//   }
// }

@Module({
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
    ]
})
export class SongsModule {}
