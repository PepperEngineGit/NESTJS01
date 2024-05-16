import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Scope,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dtos/create-song.dto';
import { Connection } from '../common/constants/connection';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dtos/update-song.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Controller({ path: 'songs', scope: Scope.DEFAULT })
export class SongsController {
  songRepository: any;
  constructor(
    private readonly songsService: SongsService,
    @Inject('CONNECTION') private connection: Connection,
  ) {
    console.log(
      `This is connection string : ${this.connection.CONNECTION_STRING}`,
    );
  }

  @Post()
  async create(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
    try {
      // save the song to the DB
      return this.songsService.create(createSongDTO);

    } catch (error) {
      throw new HttpException(
        `Error in song controller - create, error: \n${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
  
}

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit = 10,
  ): Promise<Pagination<Song>> {
    try {
      limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({
      page,
      limit,
    });
    } catch (error) {
      throw new HttpException(
        'Error in songs service - findAll',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),) id: number): Promise<Song> {
    return this.songsService.findOne(id)
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateSongDTO: UpdateSongDTO): Promise<UpdateResult> {
    try {
      // save the song to the DB
      return this.songsService.update(id, updateSongDTO);
    } catch (error) {
      throw new HttpException(
        `Error in song controller - update, error: \n${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
  
}

  @Delete(':id')
  delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) : Promise<DeleteResult> {
    try {
      // save the song to the DB
      return this.songsService.remove(id);

    } catch (error) {
      throw new HttpException(
        `Error in song controller - create, error: \n${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}