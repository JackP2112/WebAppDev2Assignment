import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  media: { type: Schema.Types.ObjectId, ref: 'Media' },
  data: String
})

const mediaSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  type: String,
  releaseDate: String,
  creators: [ {role: String, name: String} ],
  genres: [ String ],
  comments: [ String ],
  status: Number
});

const Image = mongoose.model('Image', imageSchema);
const Media = mongoose.model('Media', mediaSchema);

export {Image, Media}
