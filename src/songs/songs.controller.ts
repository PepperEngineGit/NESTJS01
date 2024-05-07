import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {SongsService} from "./songs.service";
import {CreateSongDTO} from "./dtos/create-song.dto";

@Controller('songs')
export class SongsController {

    constructor(private readonly songsService: SongsService) {}

    @Post()
    create(@Body() createSongDTO: CreateSongDTO) {
        // save the song to the DB
        return this.songsService.create(createSongDTO)
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
