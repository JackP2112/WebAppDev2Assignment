//does not work

import should from 'should';
import { Media } from '../mediaModel';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectID = require('mongodb').ObjectID;

describe('mediaModelTests', () => {
  
  let item = {};
  beforeEach(() => {
    item = {
      _id: new ObjectID();
      title: 'Blade Runner',
      type: 'movie',
      releaseDate: '1982-06-25',
      creators: [
        {
          role: 'director',
          name: 'Ridley Scott'
        }
      ],
      genres: ['Sci-Fi', 'Dystopian'],
      comments: ['watch the sequel'],
      status: 1
    };
  });

  it('should validate a media item with all attributes', (done) => {
    const m = new Media(item);
    console.log(m);
    console.log(item);
    m.validate((err) => {
      should.not.exist(err);
      m._id.should.equal(item._id);
      m.title.should.equal(item.title);
      m.type.should.equal(item.type);
      m.releaseDate.should.equal(item.releaseDate);
      m.creators.should.equal(item.creators);
      m.genres.should.equal(item.genres);
      m.comments.should.equal(item.comments);
      m.status.should.equal(item.status);
      done();
    });
  });
});
