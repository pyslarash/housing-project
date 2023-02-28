import { Container, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Results from "./results";
import SearchBox from "./searchbox";

const Search = () => {
    return (
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container sx={{ justifyContent: 'center', alignItems: 'center', padding: '30px', marginTop: '30px' }}>
                <SearchBox />
            </Grid>
            <Grid container sx={{ justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                <Results />
            </Grid>
        </Container>
    )
};

export default Search;