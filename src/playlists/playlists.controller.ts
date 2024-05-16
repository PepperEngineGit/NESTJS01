import { Body, Controller, Post } from "@nestjs/common";
import { Playlist } from "./playlists.entity";
import { PlayListsService } from "./playlists.service";
import { CreatePlayListDTO } from "./dtos/create-playlist.dto";

@Controller('playlists')
export class PlayListsController {
    constructor(private playListsService: PlayListsService) {}
    @Post()
    create(@Body() playlistDTO: CreatePlayListDTO,): Promise<Playlist> {
        return this.playListsService.create(playlistDTO)
    }
}