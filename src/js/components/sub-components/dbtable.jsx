import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Typography } from '@mui/material';

const DbTable = ({ data }) => {
    return (
        <TableContainer>
            <Table aria-label="city data table">
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">Metro Area and State(s):</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.metro}, {data.metro_state}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">City Population:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.city_population ? data.city_population.toLocaleString() : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">Metro Area Population:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.metro_population ? data.metro_population.toLocaleString() : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">City Density:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.city_density ? data.city_density.toLocaleString() + ' people per sq mile' : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">City Median Income:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.city_median_income ? '$' + data.city_median_income.toLocaleString() : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">City Avg 1BR Price:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.city_one_br_price ? '$' + data.city_one_br_price.toLocaleString() : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">City Avg 2BR Price:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.city_two_br_price ? '$' + data.city_two_br_price.toLocaleString() : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">Metro Area Avg 1BR Price:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.metro_one_br_price ? '$' + data.metro_one_br_price.toLocaleString() : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">Metro Area Avg 2BR Price:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.metro_two_br_price ? '$' + data.metro_two_br_price.toLocaleString() : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">State Avg 1BR Price:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.state_one_br_price ? '$' + data.state_one_br_price.toLocaleString() : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">State Avg 2BR Price:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.state_two_br_price ? '$' + data.state_two_br_price.toLocaleString() : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">City Violent Crime Rate:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.city_crime_violent ? data.city_crime_violent.toLocaleString() + ' per 100K people' : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">City Property Crime Rate:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.city_crime_property ? data.city_crime_property.toLocaleString() + ' per 100K people' : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">Is This City Good for Startups:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.city_is_startup ? 'Yes' : 'No Data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">Is it a foodie town:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.city_is_foodie ? 'Yes' : 'No Data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">Number of Breweries in the City:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.city_num_of_brews ? data.city_num_of_brews : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">Metro Area Air Quality Index:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.metro_aqi ? data.metro_aqi : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">Metro Area Unemployment Rate:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.metro_unemployment ? data.metro_unemployment + '%' : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">Metro Area Avg. National Walking Index:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.metro_avg_nwi ? data.metro_avg_nwi : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">State Minimum Wage:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.state_min_wage ? '$' + data.state_min_wage + '/Hour' : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">Legal Status of Marijuana in the State:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.mj_legal_status ? data.mj_legal_status : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">Medicinal Use of Marijuana is Allowed:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.mj_medicinal ? data.mj_medicinal : 'No data'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">Criminal Status of Marijuana:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">{data.mj_decriminalized !== null ? (data.mj_decriminalized ? "Decriminalized" : "Criminalized") : "No data"}</Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DbTable;