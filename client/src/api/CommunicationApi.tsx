
import instance from './api';

const CommunicationApi = {

  async getComData(autorId: string) {
    try {
      return await instance
        .get(`/com_data/?params=${autorId}`)
        .then((res) => res.data);
    } catch (err) {
      return err;
    }
  },

};

export default CommunicationApi;



