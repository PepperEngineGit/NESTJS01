import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSongDTO } from './dtos/create-song.dto';
import { UpdateSongDTO } from './dtos/update-song.dto';
import { Artist } from 'src/artists/artists.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';


@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}
  // local db
  // local array


  async create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    try {
      song.title = songDTO.title;
      song.duration = songDTO.duration;
      song.lyrics = songDTO.lyrics;
      song.releaseDate = songDTO.releaseDate

      return await this.songRepository.save(song)

    } catch (error) {
      throw new HttpException(
        'Error in songs service - create',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  async findAll(): Promise<Song[]> {
    try {
      return await this.songRepository.find();
    } catch (error) {
      throw new HttpException(
        'Error in songs service - findAll',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Song> {
    try {
      return await this.songRepository.findOneBy({id});
    } catch (error) {
      throw new HttpException(
        'Error in songs service - findAll',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      return await this.songRepository.delete({id})
    } catch (error) {
      throw new HttpException(
        'Error in songs service - findAll',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, songDTO: UpdateSongDTO): Promise<UpdateResult> {
    try {
      return await this.songRepository.update(id, songDTO)
    } catch (error) {
      throw new HttpException(
        'Error in songs service - update',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }
  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releaseDate', 'DESC');

    return paginate<Song>(queryBuilder, options);
  }
}


