import { Table, TableCell, TableContainer, TableRow } from '@mui/material';
import { Typography } from '@mui/material';

const WeatherWindow = ({ data }) => {

    // Turning Wind direction degree into the actual direction
    const windDirections = [
        'North', 'North-northeast', 'Northeast', 'East-northeast',
        'East', 'East-southeast', 'Southeast', 'South-southeast',
        'South', 'South-southwest', 'Southwest', 'West-southwest',
        'West', 'West-northwest', 'Northwest', 'North-northwest'
    ];

    const windDirectionDegree = data.dominant_wind_direction; // Example degree value
    const windDirectionIndex = Math.floor((windDirectionDegree / 22.5) + 0.5) % 16;
    const windDirectionString = windDirections[windDirectionIndex];

    // Turning UV index into a clear wording
    const uvIndex = data.uv_undex_max;

    let uvIndexScale;
    if (uvIndex < 3) {
        uvIndexScale = "Very Low";
    } else if (uvIndex < 6) {
        uvIndexScale = "Low";
    } else if (uvIndex < 8) {
        uvIndexScale = "Moderate";
    } else if (uvIndex < 11) {
        uvIndexScale = "High";
    } else {
        uvIndexScale = "Very High";
    }

    return (
        <TableContainer>
            <Table>
                <TableRow>
                    <TableCell>
                        <Typography variant="subtitle1">Current Temperature:</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle1">{data.current_temp + '°F'}</Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography variant="subtitle1">Precipitation:</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle1">{data.precipitation + ' inch'}</Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography variant="subtitle1">Precipitation probability:</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle1">{data.precipitation_probability + '%'}</Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography variant="subtitle1">Humidity:</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle1">{data.current_humidity + '%'}</Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography variant="subtitle1">Cloudiness:</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle1">{data.cloudcover + '%'}</Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography variant="subtitle1">Visibility:</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle1">{(data.visibility / 5280).toFixed(2) + ' miles'}</Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography variant="subtitle1">Wind Direction:</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle1">{windDirectionString}</Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography variant="subtitle1">Wind Speed:</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle1">{data.wind_speed + ' mph'}</Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography variant="subtitle1">Wind Gusts:</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle1">{data.wind_gusts + ' mph'}</Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography variant="subtitle1">Maximum UV Index:</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle1">{uvIndexScale}</Typography>
                    </TableCell>
                </TableRow>
            </Table>
        </TableContainer>
    );
};

export default WeatherWindow;