import * as React from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';

const CityZip = () => {
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const zipCodeRef = React.useRef('');

  const handleZipChange = (event) => {
    zipCodeRef.current = event.target.value;
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      setLoading(true);
      const zipCode = zipCodeRef.current;
      const url = `https://www.zipcodeapi.com/rest/js-H0A6g6Pr7QD5b7vWwfSsZyKq9A4OXVBN1CkhWdtQJCvePxAt6ctcWh87s7bkNaBA/info.json/${zipCode}/degrees`;

      axios.get(url)
        .then((response) => {
          const { city, state } = response.data;
          setCity(city);
          setState(state);
          console.log(city, state)
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <TextField 
        id="outlined-search" 
        label="ZIP Code" 
        type="search"
        onChange={handleZipChange}
        onKeyDown={handleEnterKeyPress}
      />
      {loading && (
        <p>Loading...</p>
      )}
      {!loading && city && state && (
        <div>
          <p>City: {city}</p>
          <p>State: {state}</p>
        </div>
      )}
    </>
  );
};

export default CityZip;
