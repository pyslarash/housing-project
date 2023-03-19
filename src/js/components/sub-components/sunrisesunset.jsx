import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';


const SunriseSunset = ({ data }) => {
    const sunriseDate = new Date(data.sunrise);
    const sunriseTime = sunriseDate.toLocaleString();
    const sunsetDate = new Date(data.sunset);
    const sunsetTime = sunsetDate.toLocaleString();

    const headerStyle = { fontSize: 24 };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell style={headerStyle} align="center">Sunrise</TableCell>
                    <TableCell style={headerStyle} align="center">Sunset</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell align="center">{sunriseTime}</TableCell>
                    <TableCell align="center">{sunsetTime}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default SunriseSunset;