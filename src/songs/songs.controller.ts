import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {SongsService} from "./songs.service";
import {CreateSongDTO} from "./dtos/create-song.dto";

@Controller('songs')
export class SongsController {

    constructor(private readonly songsService: SongsService) {}

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
