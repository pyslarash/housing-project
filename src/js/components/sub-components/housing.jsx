import { Table, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const Housing = ({ city, state }) => {
    const headerStyle = { fontSize: 24 };
    const siteStyle = { fontSize: 18 };

    const zillow = `${city.toLowerCase().replace(/\s/g, '-')}-${state.toLowerCase()}`;
    const zillowURL = `https://www.zillow.com/${zillow}/rentals/`;
    const apartmentsCom = `${city.toLowerCase().replace(/\s/g, '_')}_${state.toLowerCase()}`;
    const apartmentsComURL = `https://www.realtor.com/apartments/${apartmentsCom}`
    const realtorCom = `${city.replace(/\s/g, '_')},${state}`;
    const realtorComURL = `https://www.trulia.com/for_rent/${realtorCom}/`;
    const trulia = `${city.toLowerCase().replace(/\s/g, '-')}-${state.toLowerCase()}`;
    const truliaURL = `https://www.apartments.com/${trulia}/`;

    return (
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell style={headerStyle} align="center" colSpan={4}>Search Rentals</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={siteStyle} align="center"><a href={zillowURL} target="_blank">Zillow</a></TableCell>
                    <TableCell style={siteStyle} align="center"><a href={apartmentsComURL} target="_blank">Apartments.com</a></TableCell>
                    <TableCell style={siteStyle} align="center"><a href={realtorComURL} target="_blank">Realtor.com</a></TableCell>
                    <TableCell style={siteStyle} align="center"><a href={truliaURL} target="_blank">Trulia</a></TableCell>
                </TableRow>
            </TableHead>
        </Table>
    )
}

export default Housing