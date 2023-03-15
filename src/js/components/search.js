import { Container, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Results from "./results";
import SearchBox from "./searchbox";
import React, {useState} from "react";

const Search = () => {
    const [resultsData, setResultsData] = useState([]); // Setting state for the results that we searched for

    const handleResults = (data) => {
      setResultsData(data);
    };

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Grid container sx={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: '30px',
              marginTop: '30px'
            }}>
              <SearchBox searchedData={handleResults} />
            </Grid>
            <Grid container sx={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px'
            }}>
              <Results results={resultsData} />
            </Grid>
          </Container>
    )
};

export default Search;