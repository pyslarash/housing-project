// Here we are getting a list of US cities based on population
import axios from "axios";

const Population = (minPop, maxPop, searchLimit) => {
    const options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
        params: {
          countryIds: 'US',
          minPopulation: minPop,
          maxPopulation: maxPop,
          sort: 'population',
          limit: searchLimit
        },
        headers: {
          'x-rapidapi-key': '1cb77fdfaamshac09c3971a8c25dp1af624jsnc0f91da79823',
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
}

export default Population;