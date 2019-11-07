import React from 'react';
import { storiesOf } from '@storybook/react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import MediaItem from '../src/components/mediaItem/';
import MainView from '../src/components/mainView/';
import SearchBar from '../src/components/searchBar/';
import Toolbar from '../src/components/toolbar/';
import ExportMenu from '../src/components/exportMenu/';
import AddItem from '../src/components/addItem/';

const samplebook = {
  type: 'book',
  title: '20,000 Leagues Under the Sea',
  releaseDate: new Date(1870, 6),
  creators: {author: 'Jules Verne'},
  genres: ['science fiction','adventure'],
  image: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Houghton_FC8_V5946_869ve_-_Verne%2C_frontispiece.jpg',
  comments: ['get hard copy'],
  itemStatus: 1 //-1 to read, 0 in progress, 1 completed
}

const samplemovie = {
  type: 'movie',
  title: 'The Thing',
  releaseDate: new Date(1982, 6, 25),
  creators: {director: 'John Carpenter'},
  genres: ['science fiction','horror'],
  image: 'https://artfiles.alphacoders.com/995/99557.jpg',
  comments: ['on netflix'],
  itemStatus: 1
}

const sampleseries = {
  type: 'series',
  title: 'Seinfeld',
  releaseDate: new Date(1982, 6, 25),
  creators: {creator: ['Larry David', 'Jerry Seinfeld']},
  genres: ['sitcom'],
  image: 'https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/v2_article_large/public/2014/07/01/seinfeld.jpg?itok=KayYkMVa',
  comments: [],
  itemStatus: 0
}

const samplemusic = {
  type: 'music',
  title: 'Station to Station',
  releaseDate: new Date(1976, 1, 23),
  creators: {artist: 'David Bowie'},
  genres: ['art rock', 'funk rock', 'soul', 'R&B', 'space rock'],
  image: 'https://upload.wikimedia.org/wikipedia/en/9/97/Station_to_Station_cover.jpg',
  comments: [],
  itemStatus: 1
}
 
storiesOf('Media Manager App/Media Item', module)
  .add('default', () => (
    <MediaItem item={samplebook}/>
  ))
  .add('selected', () => (
    <MediaItem item={samplebook} selected={true}/>
  ));

storiesOf('Media Manager App/Main View', module).add('default', () => {
  const samples = [samplemovie, samplebook, samplemusic, sampleseries, samplebook, samplemovie, samplemusic, samplebook, samplemusic]
  return <MainView items={samples}/>
});

storiesOf('Media Manager App/SearchBar', module).add('default', () => (
  <SearchBar />
));

storiesOf('Media Manager App/Toolbar', module).add('default', () => (
  <Toolbar />
));

storiesOf('Media Manager App/ExportMenu', module).add('default', () => (
  <ExportMenu />
));

storiesOf('Media Manager App/AddItem', module).add('default', () => (
  <AddItem />
));
