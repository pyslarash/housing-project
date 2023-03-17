import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IconButton, Tooltip, Typography, Grid, Paper, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import StateName from './statecodename';
import WeatherPredictionChart from './sub-components/weatherpredchart';
import WeatherHistoricChart from './sub-components/weatherhistchart';
import WeatherWindow from './sub-components/weatherwindow';
import SunriseSunset from './sub-components/sunrisesunset';
import DbTable from './sub-components/dbtable';
import CityImages from './sub-components/cityimage';
import Housing from './sub-components/housing';


const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const URL = process.env.REACT_APP_BD_URL;
const CSE_ID = process.env.REACT_APP_GOOGLE_CSE_ID;

const SingleCity = () => {
    const { id } = useParams();
    const [cityData, setCityData] = useState(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [wPredChartData, setWPredChartData] = useState([]);
    const [wHistChartData, setWHistChartData] = useState([]);
    const [currentWeather, setCurrentWeather] = useState({});
    const [images, setImages] = useState([]); // Google Images API state
    const navigate = useNavigate(); // This hooks into the browser's history API

    const handleBack = () => {
        navigate(-1); // This will take you back to the previous page in the browser history
    };

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
        const date_one = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
            .toISOString()
            .slice(0, 10);
        const date_two = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 37)
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

                    const weatherPredictionUrl = `https://api.open-meteo.com/v1/forecast?latitude=${formattedLatitude}&longitude=${formattedLongitude}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,precipitation,cloudcover,visibility&daily=sunrise,sunset,uv_index_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`;
                    const [date_one, date_two] = getHistoricWeatherDates();
                    const historicWeatherUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${formattedLatitude}&longitude=${formattedLongitude}&start_date=${date_two}&end_date=${date_one}&hourly=temperature_2m,precipitation&timezone=America%2FNew_York&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch`;

                    Promise.all([
                        axios.get(historicWeatherUrl),
                        axios.get(weatherPredictionUrl)
                    ])
                        .then(([historicWeatherResponse, weatherPredictionResponse]) => {
                            // format data for the LineChart component
                            const wPredData = weatherPredictionResponse.data.hourly.temperature_2m.map((temp, index) => {
                                const time = new Date(weatherPredictionResponse.data.hourly.time[index]);
                                return {
                                    Temperature: temp,
                                    time: time.getTime(),
                                };
                            });
                            const wHistData = historicWeatherResponse.data.hourly.temperature_2m.map((temp, index) => {
                                const time = new Date(historicWeatherResponse.data.hourly.time[index]);
                                return {
                                    Temperature: temp,
                                    time: time.getTime(),
                                };
                            });
                            const curWeather = {
                                current_temp: weatherPredictionResponse.data.hourly.temperature_2m[0],
                                current_humidity: weatherPredictionResponse.data.hourly.relativehumidity_2m[0],
                                precipitation_probability: weatherPredictionResponse.data.hourly.precipitation_probability[0],
                                precipitation: weatherPredictionResponse.data.hourly.precipitation[0],
                                cloudcover: weatherPredictionResponse.data.hourly.cloudcover[0],
                                visibility: weatherPredictionResponse.data.hourly.visibility[0],
                                sunrise: weatherPredictionResponse.data.daily.sunrise[0],
                                sunset: weatherPredictionResponse.data.daily.sunset[0],
                                uv_undex_max: weatherPredictionResponse.data.daily.uv_index_max[0],
                                dominant_wind_direction: weatherPredictionResponse.data.daily.winddirection_10m_dominant[0],
                                wind_gusts: weatherPredictionResponse.data.daily.windgusts_10m_max[0],
                                wind_speed: weatherPredictionResponse.data.daily.windspeed_10m_max[0],
                            };
                            setWPredChartData(wPredData);
                            setWHistChartData(wHistData);
                            setCurrentWeather(curWeather);
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

    // Building Google Map

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

    // Checking if there's cityData and whether we loaded the script. We need it to get rid of an error where we were calling Google API multiple times.

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

    useEffect(() => {
        let source = axios.CancelToken.source();
        if (!cityData) return;

        const modifiedCity = cityData.city.replace(/\s+/g, '+').toLowerCase();
        const googleCity = modifiedCity ? `${modifiedCity}+${cityData.state.toLowerCase()}` : '';

        axios.get(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${googleCity}&searchType=image`, {
            cancelToken: source.token
        })
            .then(response => {
                const topLinks = [];
                const addedLinks = new Set();
                response.data.items
                    .filter(item => {
                        // filter images based on screen size and aspect ratio
                        if (window.innerWidth >= 768) {
                            return (item.image.width >= 800 && item.image.height >= 1000) || (item.image.height >= 500 && item.image.width / item.image.height >= 0.8 && item.image.width / item.image.height < 1.25); // filter images with at least 8x10 or wider and at least 500px in height on large screens
                        } else {
                            return item.image.width / item.image.height <= 1.25; // filter vertical or square images on small screens
                        }
                    })
                    .forEach(item => {
                        if (addedLinks.size < 25 && !addedLinks.has(item.link)) {
                            topLinks.push(item.link);
                            addedLinks.add(item.link);
                        }
                    });
                setImages(topLinks);
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log('Request canceled:', error.message);
                } else {
                    console.error(error);
                }
            });


        return () => {
            source.cancel('Component unmounted');
        };
    }, [cityData]);

    if (!cityData) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ mb: 4 }}>
            <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: '10px', borderBottom: '1px solid lightgrey' }}>
                <Grid item sx={{ flexGrow: 1, textAlign: 'right' }}>
                    <Tooltip title="Back">
                        <IconButton size="large" sx={{ marginRight: '20px' }} onClick={handleBack}>
                            <ArrowBackIcon sx={{ fontSize: 36 }} />
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
                            <TurnedInIcon sx={{ fontSize: 36 }} />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={6}>
                    {/* Google Map Goes Here */}
                    <Paper sx={{ margin: '20px', overflow: 'hidden' }}>
                        <div id="map" style={{ height: '500px' }}></div>
                    </Paper>
                    <Paper sx={{ margin: '20px', height: '110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <SunriseSunset data={currentWeather} />
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
                            Current Weather
                        </Typography>
                        <WeatherWindow data={currentWeather} />
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
                            Temperature Forecast
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
                            Temperature In the Past Month
                        </Typography>
                        <WeatherHistoricChart data={wHistChartData} />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper sx={{ margin: '20px', height: '500px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CityImages data={images} />
                    </Paper>
                    <Paper sx={{ margin: '20px', height: '110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Housing city={cityData.city} state={cityData.state} />
                    </Paper>
                    <Paper sx={{ margin: '20px' }}>
                        <DbTable data={cityData} />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SingleCity;