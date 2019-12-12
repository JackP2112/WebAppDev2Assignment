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

function handleError(res, err){
  return res.send(500, err);
};

export default router;
