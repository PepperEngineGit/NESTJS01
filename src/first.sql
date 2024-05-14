CREATE TABLE artists (
  id NUMERIC NOT NULL,
  name VARCHAR NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id NUMERIC NOT NULL UNIQUE,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE playlists (
  id NUMERIC NOT NULL UNIQUE,
  name VARCHAR NOT NULL,
  user_id NUMERIC NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE songs (
  id NUMERIC NOT NULL UNIQUE,
  title VARCHAR NOT NULL,
  release_date DATE NOT NULL,
  duration INTERVAL NOT NULL,
  lyrics TEXT NOT NULL,
  playlist_id NUMERIC,
  PRIMARY KEY (id),
  FOREIGN KEY (playlist_id) REFERENCES playlists (id)
);

CREATE TABLE songs_artists (
  song_id NUMERIC NOT NULL,
  artist_id NUMERIC NOT NULL,
  PRIMARY KEY (song_id, artist_id),
  FOREIGN KEY (song_id) REFERENCES songs (id),
  FOREIGN KEY (artist_id) REFERENCES artists (id)
);
