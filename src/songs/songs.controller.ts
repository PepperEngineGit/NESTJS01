import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    ParseIntPipe,
    Post,
    Put, Scope,
} from '@nestjs/common';
import {SongsService} from "./songs.service";
import {CreateSongDTO} from "./dtos/create-song.dto";
import {Connection} from "../common/constants/connection";

@Controller(
    {path: 'songs', scope: Scope.DEFAULT}
)
export class SongsController {

    constructor(private readonly songsService: SongsService,
                @Inject('CONNECTION') private connection: Connection) {
        console.log(`This is connection string : ${this.connection.CONNECTION_STRING}`);
    }

    @Post()
    async create(@Body() createSongDTO: CreateSongDTO) {
        try {
            // save the song to the DB
            this.songsService.create(createSongDTO);
            console.log(`[💚] 🎷 🎉 🥗 Song Created Successfully 🥗 🎉 🎷\n "${createSongDTO.title}" from "${createSongDTO.artists[0]} ${createSongDTO.artists.length > 1 ? `and ${createSongDTO.artists.slice(1).join(' ' + 'and ')} ` : ''}`);
            return {
                message: '[💚] 🎷 🎉 🥗 Song Created Successfully 🥗 🎉 🎷',
                createSongDTO
            };
        } catch (error) {
            throw new HttpException(`Error in song controller - create, error:
${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    findAll(){
        // Fetch the songs from the DB
        try {
            return this.songsService.findAll();
        } catch (error) {
            throw new HttpException('Your song library is empty bro\'', HttpStatus.NOT_FOUND)
        }
    }
    @Get(':id')
    findOne(@Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number){
        return `Fetch songs based on the given id ${id}`;
    }
    @Put(':id')
    update(@Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number){
        return 'Update songs based on the given id';
    }
    @Delete(':id')
    delete(@Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number){
        return 'Delete songs based on the given id';
    }
}
