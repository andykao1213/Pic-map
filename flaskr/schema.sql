drop table if exists entries;
create table entries (
  id integer primary key autoincrement,
  title text not null,
  'text' text not null,
  author text not null,
  room_token text not null
);

drop table if exists marker_entries;
create table marker_entries (
  id integer primary key autoincrement,
  album_token text not null,
  lat text not null,
  lng text not null,
  img text not null
);


drop table if exists account_entries;
create table account_entries (
  id integer primary key autoincrement,
  username text not null,
  password text not null
);


drop table if exists room_entries;
create table room_entries (
  id integer primary key autoincrement,
  owner text not null,
  partners text, 
  token text not null
);

drop table if exists album_entries;
create table album_entries (
  id integer primary key autoincrement,
  owner text not null,
  partners text, 
  token text not null
);