import { useDispatch } from 'react-redux';
import { setResultsData } from '../../store/searchSlice';
import axios from 'axios';
import { BD_URL } from "../../keys";
import CryptoJS from 'crypto-js';

const URL = CryptoJS.AES.decrypt(BD_URL, "secret_key").toString(CryptoJS.enc.Utf8);

// I couldn't call useDispatch within a function, so I had to do this instead

export const useSearch = () => {
  const dispatch = useDispatch();

  const handleSearch = async (searchQuery) => {
    try {
      const response = await axios.get(`${URL}/filtered_city_data?${searchQuery}`);
      const results = response.data;
      dispatch(setResultsData(results)); // Dispatch the setResultsData action
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleSearch,
  };
};
