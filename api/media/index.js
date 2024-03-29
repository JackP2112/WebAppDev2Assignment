import express from 'express';
import { Media, Image } from './mediaModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();

//Get all media
router.get('/', asyncHandler(async (req, res) => {
  const media = await Media.find();
  const images = await Image.find();
  const body = {media: media, images: images};
  res.status(200).json(body);
}));

//Create a media item
router.post('/', asyncHandler(async (req, res) => {
  console.log(req.body.media);
  const mediaItem = await Media.create(req.body.media);
  const image = await Image.create({
    media: mediaItem._id,
    data: req.body.image
  });
  res.status(201).json(mediaItem);
}));

//Update a media item
router.put('/:id', asyncHandler(async (req,res) => {
  if (req.body._id) delete req.body._id;
  const item = await Media.findOneAndUpdate({'_id': req.params.id},
    req.body,
    {upsert: false}
  );
  if (!item) return res.sendStatus(404);
  return res.json(200, item);
}));

//Delete a media item
router.delete('/:id', asyncHandler(async (req,res) => {
  const item = await Media.findById(req.params.id);
  const image = await Image.find({'media':req.params.id});
  if (!item || !image) return res.send(404);
  await item.remove();
  await image.remove();
  return res.status(204).send(item);
}));

function handleError(res, err){
  return res.send(500, err);
};

export default router;
