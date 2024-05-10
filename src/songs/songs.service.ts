import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

@Injectable()
export class SongsService {
    // local db
    // local array

    private readonly songs = [];

    create(song) {
        try {
            this.songs.push(song);
        } catch (error) {
            throw new HttpException('Error in songs service - create', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return this.songs;
    }

    findAll() {
        return this.songs;
    }

}