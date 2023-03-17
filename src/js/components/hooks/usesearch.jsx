import { useDispatch } from 'react-redux';
import { setResultsData } from '../../store/searchSlice';
import axios from 'axios';

const URL = process.env.ENV_BD_URL;

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
