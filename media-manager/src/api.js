import axios from 'axios';

export const getAll = () => {
  return axios('/api/media')
    .then(resp => resp.data);
};
