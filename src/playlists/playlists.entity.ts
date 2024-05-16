import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Song } from '../songs/song.entity';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Each Playlist will have multiple songs
  @OneToMany(() => Song, (song) => song.playList, { onDelete: 'CASCADE' })
  songs: Song[];

  // Many Playlists can belong to a single unique user
  @ManyToOne(() => User, (user) => user.playLists, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
