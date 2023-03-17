import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MinMax from './sub-components/minmax';
import TextField from './sub-components/textfield';
import Checkmark from './sub-components/checkmark';
import Dropdown from './sub-components/dropdown';
import SelectMany from './sub-components/select-many';
import Button from '@mui/material/Button';
import { useSearch } from './hooks/usesearch';
import { useDispatch, useSelector } from "react-redux";
import filterSlice, {
  setCityPopulationMin, setCityPopulationMax, setCityPopulationIsNA, setCityPopulationIsActive, setCityDensityMin,
  setCityDensityMax, setCityDensityIsNA, setCityDensityIsActive, setCityMedianIncomeMin, setCityMedianIncomeMax, setCityMedianIncomeIsNA,
  setCityMedianIncomeIsActive, setCityViolentCrimeMin, setCityViolentCrimeMax, setCityViolentCrimeIsNA, setCityViolentCrimeIsActive,
  setCityPropertyCrimeMin, setCityPropertyCrimeMax, setCityPropertyCrimeIsNA, setCityPropertyCrimeIsActive, setCityOneBrRentCostMin,
  setCityOneBrRentCostMax, setCityOneBrRentCostIsNA, setCityOneBrRentCostIsActive, setCityTwoBrRentCostMin, setCityTwoBrRentCostMax,
  setCityTwoBrRentCostIsNA, setCityTwoBrRentCostIsActive, setCityMinBrews, setCityMinBrewsIsNA, setCityMinBrewsIsActive, setCityIsFoodie,
  setCityIsStartup, setMetroPopulationMin, setMetroPopulationMax, setMetroPopulationIsNA, setMetroPopulationIsActive, setMetroAQIMin, setMetroAQIMax,
  setMetroAQIIsNA, setMetroAQIIsActive, setMetroNWIMin, setMetroNWIMax, setMetroNWIIsNA, setMetroNWIIsActive, setMetroUnemploymentMin, setMetroUnemploymentMax,
  setMetroUnemploymentIsNA, setMetroUnemploymentIsActive, setMetroOneBrRentCostMin, setMetroOneBrRentCostMax, setMetroOneBrRentCostIsNA,
  setMetroOneBrRentCostIsActive, setMetroTwoBrRentCostMin, setMetroTwoBrRentCostMax, setMetroTwoBrRentCostIsNA, setMetroTwoBrRentCostIsActive,
  setStateList, setStateListArrayList, setStateListIsActive, setStateMinWageMin, setStateMinWageMax, setStateMinWageIsNA, setStateMinWageIsActive, setStateOneBrRentCostMin,
  setStateOneBrRentCostMax, setStateOneBrRentCostIsNA, setStateOneBrRentCostIsActive, setStateTwoBrRentCostMin, setStateTwoBrRentCostMax, setStateTwoBrRentCostIsNA,
  setStateTwoBrRentCostIsActive, setStateMJStatus, setStateMJStatusListArray, setStateMJStatusIsActive, setStateMJMedicinalStatus, setStateMJMedicinalStatusListArray,
  setStateMJMedicinalStatusIsActive, setStateMJCriminalStatus, setStateMJCriminalStatusListArray, setStateMJCriminalStatusIsActive
} from '../store/searchBoxSlice';

const SearchBox = ({ searchedData }) => {
  const URL = "http://localhost:5000";
  const { handleSearch } = useSearch();
  const dispatch = useDispatch();

  // Creating selectors
  const cityPopulationMin = useSelector((state) => state?.searchBoxSlice?.cityPopulationMin); // The > makes sure that we are not getting any undefined values
  const cityPopulationMax = useSelector((state) => state?.searchBoxSlice?.cityPopulationMax);
  const cityPopulationIsNA = useSelector((state) => state?.searchBoxSlice?.cityPopulationIsNA);
  const cityPopulationIsActive = useSelector((state) => state?.searchBoxSlice?.cityPopulationIsActive);

  const cityDensityMin = useSelector((state) => state?.searchBoxSlice?.cityDensityMin);
  const cityDensityMax = useSelector((state) => state?.searchBoxSlice?.cityDensityMax);
  const cityDensityIsNA = useSelector((state) => state?.searchBoxSlice?.cityDensityIsNA);
  const cityDensityIsActive = useSelector((state) => state?.searchBoxSlice?.cityDensityIsActive);

  const cityMedianIncomeMin = useSelector((state) => state?.searchBoxSlice?.cityMedianIncomeMin);
  const cityMedianIncomeMax = useSelector((state) => state?.searchBoxSlice?.cityMedianIncomeMax);
  const cityMedianIncomeIsNA = useSelector((state) => state?.searchBoxSlice?.cityMedianIncomeIsNA);
  const cityMedianIncomeIsActive = useSelector((state) => state?.searchBoxSlice?.cityMedianIncomeIsActive);

  const cityViolentCrimeMin = useSelector((state) => state?.searchBoxSlice?.cityViolentCrimeMin);
  const cityViolentCrimeMax = useSelector((state) => state?.searchBoxSlice?.cityViolentCrimeMax);
  const cityViolentCrimeIsNA = useSelector((state) => state?.searchBoxSlice?.cityViolentCrimeIsNA);
  const cityViolentCrimeIsActive = useSelector((state) => state?.searchBoxSlice?.cityViolentCrimeIsActive);

  const cityPropertyCrimeMin = useSelector((state) => state?.searchBoxSlice?.cityPropertyCrimeMin);
  const cityPropertyCrimeMax = useSelector((state) => state?.searchBoxSlice?.cityPropertyCrimeMax);
  const cityPropertyCrimeIsNA = useSelector((state) => state?.filsearchBoxSliceters?.cityPropertyCrimeIsNA);
  const cityPropertyCrimeIsActive = useSelector((state) => state?.searchBoxSlice?.cityPropertyCrimeIsActive);

  const cityOneBrRentCostMin = useSelector((state) => state?.searchBoxSlice?.cityOneBrRentCostMin);
  const cityOneBrRentCostMax = useSelector((state) => state?.searchBoxSlice?.cityOneBrRentCostMax);
  const cityOneBrRentCostIsNA = useSelector((state) => state?.searchBoxSlice?.cityOneBrRentCostIsNA);
  const cityOneBrRentCostIsActive = useSelector((state) => state?.searchBoxSlice?.cityOneBrRentCostIsActive);

  const cityTwoBrRentCostMin = useSelector((state) => state?.searchBoxSlice?.cityTwoBrRentCostMin);
  const cityTwoBrRentCostMax = useSelector((state) => state?.searchBoxSlice?.cityTwoBrRentCostMax);
  const cityTwoBrRentCostIsNA = useSelector((state) => state?.searchBoxSlice?.cityTwoBrRentCostIsNA);
  const cityTwoBrRentCostIsActive = useSelector((state) => state?.searchBoxSlice?.cityTwoBrRentCostIsActive);

  const cityMinBrews = useSelector((state) => state?.searchBoxSlice?.cityMinBrews);
  const cityMinBrewsIsNA = useSelector((state) => state?.searchBoxSlice?.cityMinBrewsIsNA);
  const cityMinBrewsIsActive = useSelector((state) => state?.searchBoxSlice?.cityMinBrewsIsActive);

  const cityIsFoodie = useSelector((state) => state?.searchBoxSlice?.cityIsFoodie);
  const cityIsStartup = useSelector((state) => state?.searchBoxSlice?.cityIsStartup);
  // Metro
  const metroPopulationMin = useSelector((state) => state?.searchBoxSlice?.metroPopulationMin);
  const metroPopulationMax = useSelector((state) => state?.searchBoxSlice?.metroPopulationMax);
  const metroPopulationIsNA = useSelector((state) => state?.searchBoxSlice?.metroPopulationIsNA);
  const metroPopulationIsActive = useSelector((state) => state?.searchBoxSlice?.metroPopulationIsActive);

  const metroAQIMin = useSelector((state) => state?.searchBoxSlice?.metroAQIMin);
  const metroAQIMax = useSelector((state) => state?.searchBoxSlice?.metroAQIMax);
  const metroAQIIsNA = useSelector((state) => state?.searchBoxSlice?.metroAQIIsNA);
  const metroAQIIsActive = useSelector((state) => state?.searchBoxSlice?.metroAQIIsActive);

  const metroNWIMin = useSelector((state) => state?.searchBoxSlice?.metroNWIMin);
  const metroNWIMax = useSelector((state) => state?.searchBoxSlice?.metroNWIMax);
  const metroNWIIsNA = useSelector((state) => state?.searchBoxSlice?.metroNWIIsNA);
  const metroNWIIsActive = useSelector((state) => state?.searchBoxSlice?.metroNWIIsActive);

  const metroUnemploymentMin = useSelector((state) => state?.searchBoxSlice?.metroUnemploymentMin);
  const metroUnemploymentMax = useSelector((state) => state?.searchBoxSlice?.metroUnemploymentMax);
  const metroUnemploymentIsNA = useSelector((state) => state?.searchBoxSlice?.metroUnemploymentIsNA);
  const metroUnemploymentIsActive = useSelector((state) => state?.searchBoxSlice?.metroUnemploymentIsActive);

  const metroOneBrRentCostMin = useSelector((state) => state?.searchBoxSlice?.metroOneBrRentCostMin);
  const metroOneBrRentCostMax = useSelector((state) => state?.searchBoxSlice?.metroOneBrRentCostMax);
  const metroOneBrRentCostIsNA = useSelector((state) => state?.searchBoxSlice?.metroOneBrRentCostIsNA);
  const metroOneBrRentCostIsActive = useSelector((state) => state?.searchBoxSlice?.metroOneBrRentCostIsActive);

  const metroTwoBrRentCostMin = useSelector((state) => state?.searchBoxSlice?.metroTwoBrRentCostMin);
  const metroTwoBrRentCostMax = useSelector((state) => state?.searchBoxSlice?.metroTwoBrRentCostMax);
  const metroTwoBrRentCostIsNA = useSelector((state) => state?.searchBoxSlice?.metroTwoBrRentCostIsNA);
  const metroTwoBrRentCostIsActive = useSelector((state) => state?.searchBoxSlice?.metroTwoBrRentCostIsActive);

  // State
  const stateList = useSelector((state) => state?.searchBoxSlice?.stateList);
  const stateListArrayList = useSelector((state) => state?.searchBoxSlice?.stateListArrayList);
  const stateListIsActive = useSelector((state) => state?.searchBoxSlice?.stateListIsActive);

  const stateMinWageMin = useSelector((state) => state?.searchBoxSlice?.stateMinWageMin);
  const stateMinWageMax = useSelector((state) => state?.searchBoxSlice?.stateMinWageMax);
  const stateMinWageIsNA = useSelector((state) => state?.searchBoxSlice?.stateMinWageIsNA);
  const stateMinWageIsActive = useSelector((state) => state?.searchBoxSlice?.stateMinWageIsActive);

  const stateOneBrRentCostMin = useSelector((state) => state?.searchBoxSlice?.stateOneBrRentCostMin);
  const stateOneBrRentCostMax = useSelector((state) => state?.searchBoxSlice?.stateOneBrRentCostMax);
  const stateOneBrRentCostIsNA = useSelector((state) => state?.searchBoxSlice?.stateOneBrRentCostIsNA);
  const stateOneBrRentCostIsActive = useSelector((state) => state?.searchBoxSlice?.stateOneBrRentCostIsActive);

  const stateTwoBrRentCostMin = useSelector((state) => state?.searchBoxSlice?.stateTwoBrRentCostMin);
  const stateTwoBrRentCostMax = useSelector((state) => state?.searchBoxSlice?.stateTwoBrRentCostMax);
  const stateTwoBrRentCostIsNA = useSelector((state) => state?.searchBoxSlice?.stateTwoBrRentCostIsNA);
  const stateTwoBrRentCostIsActive = useSelector((state) => state?.searchBoxSlice?.stateTwoBrRentCostIsActive);

  const stateMJStatus = useSelector((state) => state?.searchBoxSlice?.stateMJStatus);
  const stateMJStatusListArray = useSelector((state) => state?.searchBoxSlice?.stateMJStatusListArray);
  const stateMJStatusIsActive = useSelector((state) => state?.searchBoxSlice?.stateMJStatusIsActive);

  const stateMJMedicinalStatus = useSelector((state) => state?.searchBoxSlice?.stateMJMedicinalStatus);
  const stateMJMedicinalStatusListArray = useSelector((state) => state?.searchBoxSlice?.stateMJMedicinalStatusListArray);
  const stateMJMedicinalStatusIsActive = useSelector((state) => state?.searchBoxSlice?.stateMJMedicinalStatusIsActive);

  const stateMJCriminalStatus = useSelector((state) => state?.searchBoxSlice?.stateMJCriminalStatus);
  const stateMJCriminalStatusListArray = useSelector((state) => state?.searchBoxSlice?.stateMJCriminalStatusListArray);
  const stateMJCriminalStatusIsActive = useSelector((state) => state?.searchBoxSlice?.stateMJCriminalStatusIsActive);

  // Building a query string
  let queryString = "";

  // CITY

  // Adding city population data
  if (cityPopulationIsActive === true) {
    let min, max;
    if (cityPopulationMin === null) { min = 0 } else { min = cityPopulationMin };
    if (cityPopulationMax === null) { max = 0 } else { max = cityPopulationMax };
    queryString += "city_population_min=" + min + "&" + "city_population_max=" + max + "&";
    if (cityPopulationIsNA === true) {
      queryString += "city_population_null_is_ok=true&"
    } else { queryString += "city_population_null_is_ok=false&" }
  }

  // Adding city density data
  if (cityDensityIsActive === true) {
    let min, max;
    if (cityDensityMin === null) { min = 0 } else { min = cityDensityMin };
    if (cityDensityMax === null) { max = 0 } else { max = cityDensityMax };
    queryString += "city_density_min=" + min + "&" + "city_density_max=" + max + "&";
    if (cityDensityIsNA === true) {
      queryString += "city_density_null_is_ok=true&"
    } else { queryString += "city_density_null_is_ok=false&" }
  }

  // Adding city median income
  if (cityMedianIncomeIsActive === true) {
    let min, max;
    if (cityMedianIncomeMin === null) { min = 0 } else { min = cityMedianIncomeMin };
    if (cityMedianIncomeMax === null) { max = 0 } else { max = cityMedianIncomeMax };
    queryString += "city_median_income_min=" + min + "&" + "city_median_income_max=" + max + "&";
    if (cityMedianIncomeIsNA === true) {
      queryString += "city_median_income_null_is_ok=true&"
    } else { queryString += "city_median_income_null_is_ok=false&" }
  }

  // Adding city violent crime
  if (cityViolentCrimeIsActive === true) {
    let min, max;
    if (cityViolentCrimeMin === null) { min = 0 } else { min = cityViolentCrimeMin };
    if (cityViolentCrimeMax === null) { max = 0 } else { max = cityViolentCrimeMax };
    queryString += "city_crime_violent_min=" + min + "&" + "city_crime_violent_max=" + max + "&";
    if (cityViolentCrimeIsNA === true) {
      queryString += "city_crime_violent_null_is_ok=true&"
    } else { queryString += "city_crime_violent_null_is_ok=false&" }
  }

  // Adding city property crime
  if (cityPropertyCrimeIsActive === true) {
    let min, max;
    if (cityPropertyCrimeMin === null) { min = 0 } else { min = cityPropertyCrimeMin };
    if (cityPropertyCrimeMax === null) { max = 0 } else { max = cityPropertyCrimeMax };
    queryString += "city_crime_property_min=" + min + "&" + "city_crime_property_max=" + max + "&";
    if (cityPropertyCrimeIsNA === true) {
      queryString += "city_crime_property_null_is_ok=true&"
    } else { queryString += "city_crime_property_null_is_ok=false&" }
  }

  // Adding city 1 bed cost
  if (cityOneBrRentCostIsActive === true) {
    let min, max;
    if (cityOneBrRentCostMin === null) { min = 0 } else { min = cityOneBrRentCostMin };
    if (cityOneBrRentCostMax === null) { max = 0 } else { max = cityOneBrRentCostMax };
    queryString += "city_one_br_price_min=" + min + "&" + "city_one_br_price_max=" + max + "&";
    if (cityOneBrRentCostIsNA === true) {
      queryString += "city_one_br_price_null_is_ok=true&"
    } else { queryString += "city_one_br_price_null_is_ok=false&" }
  }

  // Adding city 2 bed cost
  if (cityTwoBrRentCostIsActive === true) {
    let min, max;
    if (cityTwoBrRentCostMin === null) { min = 0 } else { min = cityTwoBrRentCostMin };
    if (cityTwoBrRentCostMax === null) { max = 0 } else { max = cityTwoBrRentCostMax };
    queryString += "city_two_br_price_min=" + min + "&" + "city_two_br_price_max=" + max + "&";
    if (cityTwoBrRentCostIsNA === true) {
      queryString += "city_two_br_price_null_is_ok=true&"
    } else { queryString += "city_two_br_price_null_is_ok=false&" }
  }

  // Adding city minimum breweries
  if (cityMinBrewsIsActive === true) {
    let min;
    if (cityMinBrews === null) { min = 0 } else { min = cityMinBrews };
    queryString += "city_num_of_brews=" + min + "&";
    if (cityMinBrewsIsNA === true) {
      queryString += "city_num_of_brews_null_is_ok=true&"
    } else { queryString += "city_num_of_brews_null_is_ok=false&" }
  }

  // Adding a foodie city check
  if (cityIsFoodie === true) {
    queryString += "city_is_foodie=TRUE&"
  }

  // Adding a startup city check
  if (cityIsStartup === true) {
    queryString += "city_is_startup=TRUE&"
  }

  // METRO

  // Adding metro population data
  if (metroPopulationIsActive === true) {
    let min, max;
    if (metroPopulationMin === null) { min = 0 } else { min = metroPopulationMin };
    if (metroPopulationMax === null) { max = 0 } else { max = metroPopulationMax };
    queryString += "metro_population_min=" + min + "&" + "metro_population_max=" + max + "&";
    if (metroPopulationIsNA === true) {
      queryString += "metro_population_null_is_ok=true&"
    } else { queryString += "metro_population_null_is_ok=false&" }
  }

  // Adding metro AQI
  if (metroAQIIsActive === true) {
    let min, max;
    if (metroAQIMin === null) { min = 0 } else { min = metroAQIMin };
    if (metroAQIMax === null) { max = 0 } else { max = metroAQIMax };
    queryString += "metro_aqi_min=" + min + "&" + "metro_aqi_max=" + max + "&";
    if (metroAQIIsNA === true) {
      queryString += "metro_aqi_null_is_ok=true&"
    } else { queryString += "metro_aqi_null_is_ok=false&" }
  }

  // Adding metro average NWI
  if (metroNWIIsActive === true) {
    let min, max;
    if (metroNWIMin === null) { min = 0 } else { min = metroNWIMin };
    if (metroNWIMax === null) { max = 0 } else { max = metroNWIMax };
    queryString += "metro_avg_nwi_min=" + min + "&" + "metro_avg_nwi_max=" + max + "&";
    if (metroNWIIsNA === true) {
      queryString += "metro_avg_nwi_null_is_ok=true&"
    } else { queryString += "metro_avg_nwi_null_is_ok=false&" }
  }

  // Adding metro unemployment rate
  if (metroUnemploymentIsActive === true) {
    let min, max;
    if (metroUnemploymentMin === null) { min = 0 } else { min = metroUnemploymentMin };
    if (metroUnemploymentMax === null) { max = 0 } else { max = metroUnemploymentMax };
    queryString += "metro_unemployment_min=" + min + "&" + "metro_unemployment_max=" + max + "&";
    if (metroUnemploymentIsNA === true) {
      queryString += "metro_unemployment_null_is_ok=true&"
    } else { queryString += "metro_unemployment_null_is_ok=false&" }
  }

  // Adding metro 1 bed cost
  if (metroOneBrRentCostIsActive === true) {
    let min, max;
    if (metroOneBrRentCostMin === null) { min = 0 } else { min = metroOneBrRentCostMin };
    if (metroOneBrRentCostMax === null) { max = 0 } else { max = metroOneBrRentCostMax };
    queryString += "metro_one_br_price_min=" + min + "&" + "metro_one_br_price_max=" + max + "&";
    if (metroOneBrRentCostIsNA === true) {
      queryString += "metro_one_br_price_null_is_ok=true&"
    } else { queryString += "metro_one_br_price_null_is_ok=false&" }
  }

  // Adding metro 2 bed cost
  if (metroTwoBrRentCostIsActive === true) {
    let min, max;
    if (metroTwoBrRentCostMin === null) { min = 0 } else { min = metroTwoBrRentCostMin };
    if (metroTwoBrRentCostMax === null) { max = 0 } else { max = metroTwoBrRentCostMax };
    queryString += "metro_two_br_price_min=" + min + "&" + "metro_two_br_price_max=" + max + "&";
    if (metroTwoBrRentCostIsNA === true) {
      queryString += "metro_two_br_price_null_is_ok=true&"
    } else { queryString += "metro_two_br_price_null_is_ok=false&" }
  }

  // STATE

  // Adding states
  if (stateListIsActive === true) {
    if (stateList === null) {
      queryString += "";
    } else {
      let statesString = stateList.map(state => `state=${state}`).join("&");
      queryString += statesString + (statesString.length > 0 ? "&" : "");
    }
  }

  // Adding state minimum wage
  if (stateMinWageIsActive === true) {
    let min, max;
    if (stateMinWageMin === null) { min = 0 } else { min = stateMinWageMin };
    if (stateMinWageMax === null) { max = 0 } else { max = stateMinWageMax };
    queryString += "state_min_wage_min=" + min + "&" + "state_min_wage_max=" + max + "&";
    // if (stateMinWageIsNA === true) {
    //   queryString += "state_min_wage_null_is_ok=true&"
    // } else { queryString += "state_min_wage_null_is_ok=false&" }
  }

  // Adding state 1 bed cost
  if (stateOneBrRentCostIsActive === true) {
    let min, max;
    if (stateOneBrRentCostMin === null) { min = 0 } else { min = stateOneBrRentCostMin };
    if (stateOneBrRentCostMax === null) { max = 0 } else { max = stateOneBrRentCostMax };
    queryString += "state_one_br_price_min=" + min + "&" + "state_one_br_price_max=" + max + "&";
    if (stateOneBrRentCostIsNA === true) {
      queryString += "state_one_br_price_null_is_ok=true&"
    } else { queryString += "state_one_br_price_null_is_ok=false&" }
  }

  // Adding state 2 bed cost
  if (stateTwoBrRentCostIsActive === true) {
    let min, max;
    if (stateTwoBrRentCostMin === null) { min = 0 } else { min = stateTwoBrRentCostMin };
    if (stateTwoBrRentCostMax === null) { max = 0 } else { max = stateTwoBrRentCostMax };
    queryString += "state_two_br_price_min=" + min + "&" + "state_two_br_price_max=" + max + "&";
    if (stateTwoBrRentCostIsNA === true) {
      queryString += "state_two_br_price_null_is_ok=true&"
    } else { queryString += "state_two_br_price_null_is_ok=false&" }
  }

  // console.log(stateMJStatus);
  // console.log(stateMJStatusIsActive);
  // console.log(stateMJMedicinalStatus);
  // console.log(stateMJMedicinalStatusIsActive);
  // console.log(stateMJCriminalStatus);
  // console.log(stateMJCriminalStatusIsActive);

  // Marijuana legal status

  if (stateMJStatusIsActive === true) {
    queryString += "state_mj_legal_status=" + stateMJStatus + "&";
  }

  // Marijuana medicinal status

  if (stateMJMedicinalStatusIsActive === true) {
    queryString += "state_mj_medicinal=" + stateMJMedicinalStatus + "&";
  }

  // Marijuana criminal status

  if (stateMJCriminalStatusIsActive === true && stateMJCriminalStatus) {
    if (stateMJCriminalStatus === "Criminalized") {
      queryString += "state_mj_decriminalized=FALSE&";
    } else if (stateMJCriminalStatus === "Decriminalized") {
      queryString += "state_mj_decriminalized=TRUE&";
    }
  } else if (stateMJCriminalStatusIsActive === false) {
    queryString += "";
  }

  // Making an API request to get the data based on the query string we created
  const handleSubmit = (e, queryString) => {
    e.preventDefault();
    handleSearch(queryString);
  };

  return (
    <>
      <Typography variant="h2" component="h1">
        Find Your City!
      </Typography>
      <Paper sx={{ width: '100%', p: 3, marginTop: '30px' }} elevation={3}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-evenly', // reduce margins between columns
          flexWrap: 'wrap', // wrap columns to next line if necessary
          flexDirection: 'row', // default value for larger screens
          '@media screen and (max-width: 600px)': { // change to column layout for smaller screens
            flexDirection: 'column'
          }
        }}>
          <Box sx={{ width: '30%', margin: '10px' }}>
            {/* This column is responsible for the City Level*/}
            <Typography variant="h5" component="h2" sx={{ marginBottom: '15px' }}>
              City
            </Typography>
            <MinMax name="City Population" questionMarkText="Enter minimum and maximum size for the city population" columnName="city_population" onMinChange={(value) => dispatch(setCityPopulationMin(value))} onMaxChange={(value) => dispatch(setCityPopulationMax(value))} onNAChange={(value) => dispatch(setCityPopulationIsNA(value))} isItActive={(value) => dispatch(setCityPopulationIsActive(value))} minChange={cityPopulationMin} maxChange={cityPopulationMax} NAChange={cityPopulationIsNA} activeChange={cityPopulationIsActive} />
            <MinMax name="City Density" questionMarkText="Enter minimum and maximum size for the city density" columnName="city_density" onMinChange={(value) => dispatch(setCityDensityMin(value))} onMaxChange={(value) => dispatch(setCityDensityMax(value))} onNAChange={(value) => dispatch(setCityDensityIsNA(value))} isItActive={(value) => dispatch(setCityDensityIsActive(value))} minChange={cityDensityMin} maxChange={cityDensityMax} NAChange={cityDensityIsNA} activeChange={cityDensityIsActive} />
            <MinMax name="City Median Income" questionMarkText="Enter minimum and maximum amount for the city median income" columnName="city_median_income" onMinChange={(value) => dispatch(setCityMedianIncomeMin(value))} onMaxChange={(value) => dispatch(setCityMedianIncomeMax(value))} onNAChange={(value) => dispatch(setCityMedianIncomeIsNA(value))} isItActive={(value) => dispatch(setCityMedianIncomeIsActive(value))} minChange={cityMedianIncomeMin} maxChange={cityMedianIncomeMax} NAChange={cityMedianIncomeIsNA} activeChange={cityMedianIncomeIsActive} />
            <MinMax name="City Violent Crime" questionMarkText="Enter minimum and maximum numbers for violent crimes per 100K" columnName="city_crime_violent" onMinChange={(value) => dispatch(setCityViolentCrimeMin(value))} onMaxChange={(value) => dispatch(setCityViolentCrimeMax(value))} onNAChange={(value) => dispatch(setCityViolentCrimeIsNA(value))} isItActive={(value) => dispatch(setCityViolentCrimeIsActive(value))} minChange={cityViolentCrimeMin} maxChange={cityViolentCrimeMax} NAChange={cityViolentCrimeIsNA} activeChange={cityViolentCrimeIsActive} />
            <MinMax name="City Property Crime" questionMarkText="Enter minimum and maximum numbers for property crimes per 100K" columnName="city_crime_property" onMinChange={(value) => dispatch(setCityPropertyCrimeMin(value))} onMaxChange={(value) => dispatch(setCityPropertyCrimeMax(value))} onNAChange={(value) => dispatch(setCityPropertyCrimeIsNA(value))} isItActive={(value) => dispatch(setCityPropertyCrimeIsActive(value))} minChange={cityPropertyCrimeMin} maxChange={cityPropertyCrimeMax} NAChange={cityPropertyCrimeIsNA} activeChange={cityPropertyCrimeIsActive} />
            <MinMax name="City 1 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average one bedroom rent cost in the city area" columnName="city_one_br_price" onMinChange={(value) => dispatch(setCityOneBrRentCostMin(value))} onMaxChange={(value) => dispatch(setCityOneBrRentCostMax(value))} onNAChange={(value) => dispatch(setCityOneBrRentCostIsNA(value))} isItActive={(value) => dispatch(setCityOneBrRentCostIsActive(value))} minChange={cityOneBrRentCostMin} maxChange={cityOneBrRentCostMax} NAChange={cityOneBrRentCostIsNA} activeChange={cityOneBrRentCostIsActive} />
            <MinMax name="City 2 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average two bedroom rent cost in the city area" columnName="city_two_br_price" onMinChange={(value) => dispatch(setCityTwoBrRentCostMin(value))} onMaxChange={(value) => dispatch(setCityTwoBrRentCostMax(value))} onNAChange={(value) => dispatch(setCityTwoBrRentCostIsNA(value))} isItActive={(value) => dispatch(setCityTwoBrRentCostIsActive(value))} minChange={cityTwoBrRentCostMin} maxChange={cityTwoBrRentCostMax} NAChange={cityTwoBrRentCostIsNA} activeChange={cityTwoBrRentCostIsActive} />
            <TextField name="Min Breweries" questionMarkText="Enter minimum amount of breweries you want in the city" columnName="city_num_of_brews" onMinChange={(value) => dispatch(setCityMinBrews(value))} onNAChange={(value) => dispatch(setCityMinBrewsIsNA(value))} isItActive={(value) => dispatch(setCityMinBrewsIsActive(value))} min={cityMinBrews} NAChange={cityMinBrewsIsNA} activeChange={cityMinBrewsIsActive} />
            <Checkmark name="Is Foode" columnName="city_is_foodie" questionMarkText="Would you like to search among the foodie towns?" onCheckingChange={(event) => dispatch(setCityIsFoodie(event))} infoUpdate={cityIsFoodie} />
            <Checkmark name="Is Startup" columnName="city_is_startup" questionMarkText="Would you like to search among the towns best suitable for startups?" onCheckingChange={(value) => dispatch(setCityIsStartup(value))} infoUpdate={cityIsStartup} />
          </Box>
          <Box sx={{ width: '30%', margin: '10px' }}>
            {/* This column is responsible for the Metro Level*/}
            <Typography variant="h5" component="h2" sx={{ marginBottom: '15px' }}>
              Metro
            </Typography>
            <MinMax name="Metro Population" questionMarkText="Enter minimum and maximum size for the metro area population" columnName="metro_population" onMinChange={(value) => dispatch(setMetroPopulationMin(value))} onMaxChange={(value) => dispatch(setMetroPopulationMax(value))} onNAChange={(value) => dispatch(setMetroPopulationIsNA(value))} isItActive={(value) => dispatch(setMetroPopulationIsActive(value))} minChange={metroPopulationMin} maxChange={metroPopulationMax} NAChange={metroPopulationIsNA} activeChange={metroPopulationIsActive} />
            <MinMax name="Metro AQI" questionMarkText="Enter minimum and maximum amount for the air quality index in the metro area" columnName="metro_aqi" onMinChange={(value) => dispatch(setMetroAQIMin(value))} onMaxChange={(value) => dispatch(setMetroAQIMax(value))} onNAChange={(value) => dispatch(setMetroAQIIsNA(value))} isItActive={(value) => dispatch(setMetroAQIIsActive(value))} minChange={metroAQIMin} maxChange={metroAQIMax} NAChange={metroAQIIsNA} activeChange={metroAQIIsActive} />
            <MinMax name="Metro NWI" questionMarkText="Enter minimum and maximum amount for the average national walking index in the metro area" columnName="metro_avg_nwi" onMinChange={(value) => dispatch(setMetroNWIMin(value))} onMaxChange={(value) => dispatch(setMetroNWIMax(value))} onNAChange={(value) => dispatch(setMetroNWIIsNA(value))} isItActive={(value) => dispatch(setMetroNWIIsActive(value))} minChange={metroNWIMin} maxChange={metroNWIMax} NAChange={metroNWIIsNA} activeChange={metroNWIIsActive} />
            <MinMax name="Metro Unemployment Rate" questionMarkText="Enter minimum and maximum amounts for the average unemployment rate in teh metro area" columnName="metro_unemployment" onMinChange={(value) => dispatch(setMetroUnemploymentMin(value))} onMaxChange={(value) => dispatch(setMetroUnemploymentMax(value))} onNAChange={(value) => dispatch(setMetroUnemploymentIsNA(value))} isItActive={(value) => dispatch(setMetroUnemploymentIsActive(value))} minChange={metroUnemploymentMin} maxChange={metroUnemploymentMax} NAChange={metroUnemploymentIsNA} activeChange={metroUnemploymentIsActive} />
            <MinMax name="Metro 1 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average one bedroom rent cost in the metro area" columnName="metro_one_br_price" onMinChange={(value) => dispatch(setMetroOneBrRentCostMin(value))} onMaxChange={(value) => dispatch(setMetroOneBrRentCostMax(value))} onNAChange={(value) => dispatch(setMetroOneBrRentCostIsNA(value))} isItActive={(value) => dispatch(setMetroOneBrRentCostIsActive(value))} minChange={metroOneBrRentCostMin} maxChange={metroOneBrRentCostMax} NAChange={metroOneBrRentCostIsNA} activeChange={metroOneBrRentCostIsActive} />
            <MinMax name="Metro 2 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average two bedroom rent cost in the metro area" columnName="metro_two_br_price" onMinChange={(value) => dispatch(setMetroTwoBrRentCostMin(value))} onMaxChange={(value) => dispatch(setMetroTwoBrRentCostMax(value))} onNAChange={(value) => dispatch(setMetroTwoBrRentCostIsNA(value))} isItActive={(value) => dispatch(setMetroTwoBrRentCostIsActive(value))} minChange={metroTwoBrRentCostMin} maxChange={metroTwoBrRentCostMax} NAChange={metroTwoBrRentCostIsNA} activeChange={metroTwoBrRentCostIsActive} />
          </Box>
          <Box sx={{ width: '30%', margin: '10px' }}>
            {/* This column is responsible for the State Level*/}
            <Typography variant="h5" component="h2" sx={{ marginBottom: '15px' }}>
              State
            </Typography>
            <SelectMany name="States" questionMarkText="Choose a US state" columnName="state" onSelectingChange={(value) => dispatch(setStateList(value))} isItActive={(value) => dispatch(setStateListIsActive(value))} selections={stateList} activeChange={stateListIsActive} storeListArray={(value) => dispatch(setStateListArrayList(value))} getListArray={stateListArrayList} />
            <MinMax name="State Min Wage" questionMarkText="Enter minimum and maximum values for the state minimum wage" columnName="state_min_wage" onMinChange={(value) => dispatch(setStateMinWageMin(value))} onMaxChange={(value) => dispatch(setStateMinWageMax(value))} onNAChange={(value) => dispatch(setStateMinWageIsNA(value))} isItActive={(value) => dispatch(setStateMinWageIsActive(value))} minChange={stateMinWageMin} maxChange={cityPopulationMax} NAChange={stateMinWageMax} activeChange={stateMinWageIsActive} />
            <MinMax name="State 1 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average one bedroom rent cost in the state" columnName="state_one_br_price" onMinChange={(value) => dispatch(setStateOneBrRentCostMin(value))} onMaxChange={(value) => dispatch(setStateOneBrRentCostMax(value))} onNAChange={(value) => dispatch(setStateOneBrRentCostIsNA(value))} isItActive={(value) => dispatch(setStateOneBrRentCostIsActive(value))} minChange={stateOneBrRentCostMin} maxChange={stateOneBrRentCostMax} NAChange={stateOneBrRentCostIsNA} activeChange={stateOneBrRentCostIsActive} />
            <MinMax name="State 2 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average two bedroom rent cost in the state" columnName="state_two_br_price" onMinChange={(value) => dispatch(setStateTwoBrRentCostMin(value))} onMaxChange={(value) => dispatch(setStateTwoBrRentCostMax(value))} onNAChange={(value) => dispatch(setStateTwoBrRentCostIsNA(value))} isItActive={(value) => dispatch(setStateTwoBrRentCostIsActive(value))} minChange={stateTwoBrRentCostMin} maxChange={stateTwoBrRentCostMax} NAChange={cityPopulationIsNA} activeChange={stateTwoBrRentCostIsNA} />
            <Dropdown name="Marijuana Legal Status" questionMarkText="Choose marijuana legal status if you are interested" columnName="mj_legal_status" onStatusChange={(value) => dispatch(setStateMJStatus(value))} isItActive={(value) => dispatch(setStateMJStatusIsActive(value))} status={stateMJStatus} activeChange={stateMJStatusIsActive} storeListArray={(value) => dispatch(setStateMJStatusListArray(value))} getListArray={stateMJStatusListArray} />
            <Dropdown name="Marijuana Medicinal Status" questionMarkText="Choose marijuana medicinal status if you are interested" columnName="mj_medicinal" onStatusChange={(value) => dispatch(setStateMJMedicinalStatus(value))} isItActive={(value) => dispatch(setStateMJMedicinalStatusIsActive(value))} status={stateMJMedicinalStatus} activeChange={stateMJMedicinalStatusIsActive} storeListArray={(value) => dispatch(setStateMJMedicinalStatusListArray(value))} getListArray={stateMJMedicinalStatusListArray} />
            <Dropdown name="Marijuana Criminal Status" questionMarkText="Choose marijuana criminal status" columnName="mj_decriminalized" trueValue="Decriminalized" falseValue="Criminalized" onStatusChange={(value) => dispatch(setStateMJCriminalStatus(value))} isItActive={(value) => dispatch(setStateMJCriminalStatusIsActive(value))} status={stateMJCriminalStatus} activeChange={stateMJCriminalStatusIsActive} storeListArray={(value) => dispatch(setStateMJCriminalStatusListArray(value))} getListArray={stateMJCriminalStatusListArray} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button sx={{ width: '200px', height: '60px', p: 3, fontSize: '24px' }} variant="contained" size="large" onClick={(e) => handleSubmit(e, queryString)}>
            Search
          </Button>
        </Box>
      </Paper>
    </>
  );
}
export default SearchBox;