
import { AuthDataType } from '../types';
import instance from './api';

const MainApi = {

  async login(data: AuthDataType) {
    try {
      return await instance
        .post('/login', data)
        .then((res) => res.data);
    } catch (err) {
      return err;
    }
  },

  async register(data: AuthDataType) {
    try {
      return await instance
        .post('/register', data)
        .then((res) => res.data);
    } catch (err) {
      return err;
    }
  },
};

export default MainApi;





