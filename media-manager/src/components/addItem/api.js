import axios from 'axios';

export const addItem = (item, image) => {
  return axios.post('/api/media', {media:item, image:image})
    .then(resp => resp.data);
};
