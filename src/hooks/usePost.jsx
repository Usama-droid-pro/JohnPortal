import { useState } from 'react';
import axios from '../axios/axios';

const usePost = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(url, payload);
      console.log(payload , "is here");
      setData(response.data);
      return response;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData};
};

export default usePost;
