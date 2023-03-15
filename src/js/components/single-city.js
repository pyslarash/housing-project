import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IconButton, Tooltip, Typography, Grid, Paper, Box } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import StateName from './statecodename';
import WeatherPredictionChart from './sub-components/weatherpredchart';
import WeatherHistoricChart from './sub-components/weatherhistchart';

const API_KEY = 'AIzaSyDncQxwYBorZLmPKjdbzvwO7mM7UP_j-qs';
let URL = "http://localhost:5000"

const SingleCity = () => {
    const { id } = useParams();
    const [cityData, setCityData] = useState(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [wPredChartData, setWPredChartData] = useState([]);
    const [wHistChartData, setWHistChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URL}/city_data/${id}`);
                setCityData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    function getHistoricWeatherDates() {
        const today = new Date();
        const date_one = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5)
          .toISOString()
          .slice(0, 10);
        const date_two = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 35)
          .toISOString()
          .slice(0, 10);
      
        return [date_one, date_two];
      }

    // Getting lat/long of a city and also getting their Weather Data
useEffect(() => {
    if (!cityData) return;
  
    const encodedCity = cityData.city.replace(/\s+/g, '%20');
    axios
      .get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodedCity}`)
      .then((response) => {
        const state = cityData.state;
        const results = response.data.results;
        const matchingResult = results.find((result) => {
          const admin1 = result.admin1;
          const stateName = StateName(state);
          return admin1 === stateName;
        });
        if (matchingResult) {
          const { latitude, longitude } = matchingResult;
          const formattedLatitude = Number(latitude).toFixed(2);
          const formattedLongitude = Number(longitude).toFixed(2);
  
          const weatherPredictionUrl = `https://api.open-meteo.com/v1/forecast?latitude=${formattedLatitude}&longitude=${formattedLongitude}&hourly=temperature_2m&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`;
          const [date_one, date_two] = getHistoricWeatherDates();
          const historicWeatherUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${formattedLatitude}&longitude=${formattedLongitude}&start_date=${date_two}&end_date=${date_one}&hourly=temperature_2m,precipitation&timezone=America%2FNew_York&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch`;  
          
          Promise.all([
            axios.get(historicWeatherUrl),
            axios.get(weatherPredictionUrl)
          ])
            .then(([historicWeatherResponse, weatherPredictionResponse]) => {
              // format data for the LineChart component
              console.log('Weather History: ', historicWeatherResponse.data);
              const wPredData = weatherPredictionResponse.data.hourly.temperature_2m.map((temp, index) => {
                return {
                  Temperature: temp,
                  time: new Date(weatherPredictionResponse.data.hourly.time[index]).toLocaleTimeString()
                };
              });
              const wHistData = historicWeatherResponse.data.hourly.temperature_2m.map((temp, index) => {
                const time = new Date(historicWeatherResponse.data.hourly.time[index]);
                return {
                  Temperature: temp,
                  time: time.getTime(),
                };
              });
            setWPredChartData(wPredData);
            setWHistChartData(wHistData);
        })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log(`No matching result found for state "${state}"`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cityData]);  

    window.initMap = () => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
          { address: `${cityData.city}, ${cityData.state}` },
          (results, status) => {
            if (status === 'OK') {
              const map = new window.google.maps.Map(document.getElementById('map'), {
                center: results[0].geometry.location,
                zoom: 10
              });
      
              const marker = new window.google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: `${cityData.city}, ${cityData.state}`
              });
            } else {
              console.error(`Geocode error: ${status}`);
            }
          }
        );
      };

    useEffect(() => {
        if (!cityData || scriptLoaded) {
          return;
        }
    
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        setScriptLoaded(true);
    
        return () => {
          document.body.removeChild(script);
        };
      }, [cityData, scriptLoaded]);

    if (!cityData) {
        return <div>Loading...</div>;
    }
    
    return (
        <Box sx={{ mb: 4 }}>            
            <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: '10px', borderBottom: '1px solid lightgrey' }}>
                <Grid item sx={{ flexGrow: 1, textAlign: 'right' }}>
                    <Tooltip title="Back">
                        <IconButton size="large" sx={{ marginRight: '20px' }}>
                            <ArrowBackIcon sx={{fontSize: 36}} />
                        </IconButton>
                    </Tooltip>
                </Grid>
                    <Grid item sx={{ flexGrow: 1, textAlign: 'center' }}>
                        <Typography variant="h3" align="center" fontWeight="bold" sx={{ display: 'inline-block' }}>
                            {cityData.city}, {cityData.state}
                        </Typography>
                    </Grid>
                <Grid item sx={{ flexGrow: 1, textAlign: 'left' }}>
                    <Tooltip title="Save">
                        <IconButton size="large" sx={{ fontSize: 36, marginLeft: '20px' }}>
                            <TurnedInIcon sx={{fontSize: 36}} />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={6}>
                    {/* Google Map Goes Here */}
                    <Paper sx={{ margin: '20px' }}>

                        <div id="map" style={{ height: '500px' }}></div>
                    </Paper>
                    <Paper sx={{ margin: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{
                            display: 'inline-block',
                            marginTop: '20px'
                        }}
                        >
                            Weather Prediction
                        </Typography>
                        <WeatherPredictionChart data={wPredChartData} />
                    </Paper>
                    <Paper sx={{ margin: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography
                                variant="h4"
                                align="center"
                                sx={{
                                    display: 'inline-block',
                                    marginTop: '20px'
                                }}
                                >
                            Weather In the Past Month
                        </Typography>
                        <WeatherHistoricChart data={wHistChartData} />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper sx={{ margin: '20px' }}>
                        <TableContainer>
                            <Table aria-label="city data table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">Metro Area and State(s):</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.metro}, {cityData.metro_state}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">City Population:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.city_population ? cityData.city_population.toLocaleString() : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">Metro Area Population:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.metro_population ? cityData.metro_population.toLocaleString() : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">City Density:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.city_density ? cityData.city_density.toLocaleString() + ' people per sq mile' : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">City Median Income:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.city_median_income ? '$'+ cityData.city_median_income.toLocaleString() : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>                                
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">City Avg 1BR Price:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.city_one_br_price ? '$'+ cityData.city_one_br_price.toLocaleString() : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">City Avg 2BR Price:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.city_two_br_price ? '$'+ cityData.city_two_br_price.toLocaleString() : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">Metro Area Avg 1BR Price:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.metro_one_br_price ? '$'+ cityData.metro_one_br_price.toLocaleString() : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">Metro Area Avg 2BR Price:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.metro_two_br_price ? '$'+ cityData.metro_two_br_price.toLocaleString() : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">State Avg 1BR Price:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.state_one_br_price ? '$'+ cityData.state_one_br_price.toLocaleString() : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">State Avg 2BR Price:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.state_two_br_price ? '$'+ cityData.state_two_br_price.toLocaleString() : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">City Violent Crime Rate:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.city_crime_violent ? cityData.city_crime_violent.toLocaleString() + ' per 100K people' : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">City Property Crime Rate:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.city_crime_property ? cityData.city_crime_property.toLocaleString() + ' per 100K people' : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">Is This City Good for Startups:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.city_is_startup ? 'Yes' : 'No Data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">Is it a foodie town:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.city_is_foodie ? 'Yes' : 'No Data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">Number of Breweries in the City:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.city_num_of_brews ? cityData.city_num_of_brews : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">Metro Area Air Quality Index:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.metro_aqi ? cityData.metro_aqi : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">Metro Area Unemployment Rate:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.metro_unemployment ? cityData.metro_unemployment + '%'  : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">Metro Area Avg. National Walking Index:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.metro_avg_nwi ? cityData.metro_avg_nwi : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">State Minimum Wage:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.state_min_wage ? '$'+ cityData.state_min_wage + '/Hour' : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">Legal Status of Marijuana in the State:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.mj_legal_status ? cityData.mj_legal_status : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">Medicinal Use of Marijuana is Allowed:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.mj_medicinal ? cityData.mj_medicinal : 'No data'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1">Criminal Status of Marijuana:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{cityData.mj_decriminalized !== null ? (cityData.mj_decriminalized ? "Decriminalized" : "Criminalized") : "No data"}</Typography>
                                        </TableCell>
                                    </TableRow>                                
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SingleCity;