import axios from 'axios';

export const deleteItem = (item) => {
  return axios.delete('/api/media/'+item._id)
    .then(resp => resp.data);
};
