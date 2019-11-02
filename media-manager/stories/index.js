import React from 'react';
import { storiesOf } from '@storybook/react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import MediaItem from '../src/components/mediaItem/';

const sample = {
  type: 'book',
  title: '20,000 Leagues Under the Sea',
  releaseDate: new Date(1870, 6),
  creators: {author: 'Jules Verne'},
  genres: ['science fiction','adventure'],
  image: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Houghton_FC8_V5946_869ve_-_Verne%2C_frontispiece.jpg',
  comments: ['get hard copy'],
  itemStatus: 1 //-1 to read, 0 in progress, 1 completed
}
 
storiesOf('Media Manager App/Media Item', module).add('default', () => (
  <MediaItem item={sample}/>
));
