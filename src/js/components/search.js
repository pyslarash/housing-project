import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import Results from "./results";
import SearchBox from "./searchbox";
import React, { useState, useCallback } from "react";

const MemoizedSearchBox = React.memo(SearchBox);
const MemoizedResults = React.memo(Results);

const Search = () => {
  const [resultsData, setResultsData] = useState([]); // Setting state for the results that we searched for

  const handleResults = useCallback((data) => {
    setResultsData(data);
  }, []);

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
        <MemoizedSearchBox searchedData={handleResults} />
      </Grid>
      <Grid container sx={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}>
        <MemoizedResults results={resultsData} />
      </Grid>
    </Container>
  )
};

export default Search;