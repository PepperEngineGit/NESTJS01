import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Playlist} from "../playlists/playlists.entity";
import {Artist} from "../artists/artists.entity";

@Entity('songs')
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('date')
    releaseDate: Date;

    @Column('time')
    duration: Date;

    @Column('text')
    lyrics: string;

    @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
    @JoinTable({ name: 'songs_artists' })
    artists: Artist[];

    // Many songs can belong to playlist for each unique user
    @ManyToOne(() => Playlist, (playlist) => playlist.songs, { onDelete: 'CASCADE' })
    @JoinColumn()
    playList: Playlist;
}