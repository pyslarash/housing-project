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
import Grid from '@mui/material/Grid';
import { useSearch } from './hooks/usesearch';
import { useDispatch, useSelector } from "react-redux";
import { updateState } from '../store/searchBoxSlice';


const SearchBox = ({ searchedData }) => {
  const URL = "http://localhost:5000";
  const { handleSearch } = useSearch();
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state.searchBoxSlice);
  
  // Passing all of the local state variables to a Redux Store
  const updateLocalState = () => {
    const currentState = {
      cityPopulationMin,
      cityPopulationMax,
      cityPopulationIsNA,
      cityPopulationIsActive,
      cityDensityMin,
      cityDensityMax,
      cityDensityIsNA,
      cityDensityIsActive,
      cityMedianIncomeMin,
      cityMedianIncomeMax,
      cityMedianIncomeIsNA,
      cityMedianIncomeIsActive,
      cityViolentCrimeMin,
      cityViolentCrimeMax,
      cityViolentCrimeIsNA,
      cityViolentCrimeIsActive,
      cityPropertyCrimeMin,
      cityPropertyCrimeMax,
      cityPropertyCrimeIsNA,
      cityPropertyCrimeIsActive,
      cityOneBrRentCostMin,
      cityOneBrRentCostMax,
      cityOneBrRentCostIsNA,
      cityOneBrRentCostIsActive,
      cityTwoBrRentCostMin,
      cityTwoBrRentCostMax,
      cityTwoBrRentCostIsNA,
      cityTwoBrRentCostIsActive,
      cityMinBrews,
      cityMinBrewsIsNA,
      cityMinBrewsIsActive,
      cityIsFoodie,
      cityIsStartup,
      metroPopulationMin,
      metroPopulationMax,
      metroPopulationIsNA,
      metroPopulationIsActive,
      metroAQIMin,
      metroAQIMax,
      metroAQIIsNA,
      metroAQIIsActive,
      metroNWIMin,
      metroNWIMax,
      metroNWIIsNA,
      metroNWIIsActive,
      metroUnemploymentMin,
      metroUnemploymentMax,
      metroUnemploymentIsNA,
      metroUnemploymentIsActive,
      metroOneBrRentCostMin,
      metroOneBrRentCostMax,
      metroOneBrRentCostIsNA,
      metroOneBrRentCostIsActive,
      metroTwoBrRentCostMin,
      metroTwoBrRentCostMax,
      metroTwoBrRentCostIsNA,
      metroTwoBrRentCostIsActive,
      stateList,
      stateListIsActive,
      stateMinWageMin,
      stateMinWageMax,
      stateMinWageIsNA,
      stateMinWageIsActive,
      stateOneBrRentCostMin,
      stateOneBrRentCostMax,
      stateOneBrRentCostIsNA,
      stateOneBrRentCostIsActive,
      stateTwoBrRentCostMin,
      stateTwoBrRentCostMax,
      stateTwoBrRentCostIsNA,
      stateTwoBrRentCostIsActive,
      stateMJStatus,
      stateMJStatusIsActive,
      stateMJMedicinalStatus,
      stateMJMedicinalStatusIsActive,
      stateMJCriminalStatus,
      stateMJCriminalStatusIsActive
    };
    // console.log("Dispatching this: ", currentState);
    dispatch(updateState(currentState));
  };

  // Declaring state variables for all of the subcomponents

  // City
  const [cityPopulationMin, setCityPopulationMin] = useState(); // City population
  const [cityPopulationMax, setCityPopulationMax] = useState();
  const [cityPopulationIsNA, setCityPopulationIsNA] = useState();
  const [cityPopulationIsActive, setCityPopulationIsActive] = useState();

  const [cityDensityMin, setCityDensityMin] = useState(); // City Density
  const [cityDensityMax, setCityDensityMax] = useState();
  const [cityDensityIsNA, setCityDensityIsNA] = useState();
  const [cityDensityIsActive, setCityDensityIsActive] = useState();

  const [cityMedianIncomeMin, setCityMedianIncomeMin] = useState(); // City Median Income
  const [cityMedianIncomeMax, setCityMedianIncomeMax] = useState();
  const [cityMedianIncomeIsNA, setCityMedianIncomeIsNA] = useState();
  const [cityMedianIncomeIsActive, setCityMedianIncomeIsActive] = useState();

  const [cityViolentCrimeMin, setCityViolentCrimeMin] = useState(); // City Violent Crime
  const [cityViolentCrimeMax, setCityViolentCrimeMax] = useState();
  const [cityViolentCrimeIsNA, setCityViolentCrimeIsNA] = useState();
  const [cityViolentCrimeIsActive, setCityViolentCrimeIsActive] = useState();

  const [cityPropertyCrimeMin, setCityPropertyCrimeMin] = useState(); // City Property Crime
  const [cityPropertyCrimeMax, setCityPropertyCrimeMax] = useState();
  const [cityPropertyCrimeIsNA, setCityPropertyCrimeIsNA] = useState();
  const [cityPropertyCrimeIsActive, setCityPropertyCrimeIsActive] = useState();

  const [cityOneBrRentCostMin, setCityOneBrRentCostMin] = useState(); // City One Bedroom Rent Cost
  const [cityOneBrRentCostMax, setCityOneBrRentCostMax] = useState();
  const [cityOneBrRentCostIsNA, setCityOneBrRentCostIsNA] = useState();
  const [cityOneBrRentCostIsActive, setCityOneBrRentCostIsActive] = useState();

  const [cityTwoBrRentCostMin, setCityTwoBrRentCostMin] = useState(); // City Two Bedroom Rent Cost
  const [cityTwoBrRentCostMax, setCityTwoBrRentCostMax] = useState();
  const [cityTwoBrRentCostIsNA, setCityTwoBrRentCostIsNA] = useState();
  const [cityTwoBrRentCostIsActive, setCityTwoBrRentCostIsActive] = useState();

  const [cityMinBrews, setCityMinBrews] = useState(); // Minimum breweries in the city
  const [cityMinBrewsIsNA, setCityMinBrewsIsNA] = useState();
  const [cityMinBrewsIsActive, setCityMinBrewsIsActive] = useState();

  const [cityIsFoodie, setCityIsFoodie] = useState(); // Foodie city?

  const [cityIsStartup, setCityIsStartup] = useState(); // Startup city?

  // Metro
  const [metroPopulationMin, setMetroPopulationMin] = useState(); // Metro population
  const [metroPopulationMax, setMetroPopulationMax] = useState();
  const [metroPopulationIsNA, setMetroPopulationIsNA] = useState();
  const [metroPopulationIsActive, setMetroPopulationIsActive] = useState();

  const [metroAQIMin, setMetroAQIMin] = useState(); // Metro Air Quality Index
  const [metroAQIMax, setMetroAQIMax] = useState();
  const [metroAQIIsNA, setMetroAQIIsNA] = useState();
  const [metroAQIIsActive, setMetroAQIIsActive] = useState();

  const [metroNWIMin, setMetroNWIMin] = useState(); // Metro average National Walking Index
  const [metroNWIMax, setMetroNWIMax] = useState();
  const [metroNWIIsNA, setMetroNWIIsNA] = useState();
  const [metroNWIIsActive, setMetroNWIIsActive] = useState();

  const [metroUnemploymentMin, setMetroUnemploymentMin] = useState(); // Metro Unemployment rates
  const [metroUnemploymentMax, setMetroUnemploymentMax] = useState();
  const [metroUnemploymentIsNA, setMetroUnemploymentIsNA] = useState();
  const [metroUnemploymentIsActive, setMetroUnemploymentIsActive] = useState();

  const [metroOneBrRentCostMin, setMetroOneBrRentCostMin] = useState(); // Metro One Bedroom Rent Cost
  const [metroOneBrRentCostMax, setMetroOneBrRentCostMax] = useState();
  const [metroOneBrRentCostIsNA, setMetroOneBrRentCostIsNA] = useState();
  const [metroOneBrRentCostIsActive, setMetroOneBrRentCostIsActive] = useState();

  const [metroTwoBrRentCostMin, setMetroTwoBrRentCostMin] = useState(); // Metro Two Bedroom Rent Cost
  const [metroTwoBrRentCostMax, setMetroTwoBrRentCostMax] = useState();
  const [metroTwoBrRentCostIsNA, setMetroTwoBrRentCostIsNA] = useState();
  const [metroTwoBrRentCostIsActive, setMetroTwoBrRentCostIsActive] = useState();

  // State
  const [stateList, setStateList] = useState(); // Selecting states
  const [stateListIsActive, setStateListIsActive] = useState();
  const [stateMinWageMin, setStateMinWageMin] = useState(); // State Minimum Wage

  const [stateMinWageMax, setStateMinWageMax] = useState();
  const [stateMinWageIsNA, setStateMinWageIsNA] = useState();
  const [stateMinWageIsActive, setStateMinWageIsActive] = useState();

  const [stateOneBrRentCostMin, setStateOneBrRentCostMin] = useState(); // State One Bedroom Rent Cost
  const [stateOneBrRentCostMax, setStateOneBrRentCostMax] = useState();
  const [stateOneBrRentCostIsNA, setStateOneBrRentCostIsNA] = useState();
  const [stateOneBrRentCostIsActive, setStateOneBrRentCostIsActive] = useState();

  const [stateTwoBrRentCostMin, setStateTwoBrRentCostMin] = useState(); // State Two Bedroom Rent Cost
  const [stateTwoBrRentCostMax, setStateTwoBrRentCostMax] = useState();
  const [stateTwoBrRentCostIsNA, setStateTwoBrRentCostIsNA] = useState();
  const [stateTwoBrRentCostIsActive, setStateTwoBrRentCostIsActive] = useState();

  const [stateMJStatus, setStateMJStatus] = useState(); // State MJ status
  const [stateMJStatusIsActive, setStateMJStatusIsActive] = useState();

  const [stateMJMedicinalStatus, setStateMJMedicinalStatus] = useState(); // State MJ Medicinal status
  const [stateMJMedicinalStatusIsActive, setStateMJMedicinalStatusIsActive] = useState();

  const [stateMJCriminalStatus, setStateMJCriminalStatus] = useState(); // State MJ Criminal status
  const [stateMJCriminalStatusIsActive, setStateMJCriminalStatusIsActive] = useState();

  // Updating the Redux Store
  useEffect(() => {
    // console.log('localState:', { cityIsFoodie });
    updateLocalState();
  }, [cityPopulationMin,
    cityPopulationMax,
    cityPopulationIsNA,
    cityPopulationIsActive,
    cityDensityMin,
    cityDensityMax,
    cityDensityIsNA,
    cityDensityIsActive,
    cityMedianIncomeMin,
    cityMedianIncomeMax,
    cityMedianIncomeIsNA,
    cityMedianIncomeIsActive,
    cityViolentCrimeMin,
    cityViolentCrimeMax,
    cityViolentCrimeIsNA,
    cityViolentCrimeIsActive,
    cityPropertyCrimeMin,
    cityPropertyCrimeMax,
    cityPropertyCrimeIsNA,
    cityPropertyCrimeIsActive,
    cityOneBrRentCostMin,
    cityOneBrRentCostMax,
    cityOneBrRentCostIsNA,
    cityOneBrRentCostIsActive,
    cityTwoBrRentCostMin,
    cityTwoBrRentCostMax,
    cityTwoBrRentCostIsNA,
    cityTwoBrRentCostIsActive,
    cityMinBrews,
    cityMinBrewsIsNA,
    cityMinBrewsIsActive,
    cityIsFoodie,
    cityIsStartup,
    metroPopulationMin,
    metroPopulationMax,
    metroPopulationIsNA,
    metroPopulationIsActive,
    metroAQIMin,
    metroAQIMax,
    metroAQIIsNA,
    metroAQIIsActive,
    metroNWIMin,
    metroNWIMax,
    metroNWIIsNA,
    metroNWIIsActive,
    metroUnemploymentMin,
    metroUnemploymentMax,
    metroUnemploymentIsNA,
    metroUnemploymentIsActive,
    metroOneBrRentCostMin,
    metroOneBrRentCostMax,
    metroOneBrRentCostIsNA,
    metroOneBrRentCostIsActive,
    metroTwoBrRentCostMin,
    metroTwoBrRentCostMax,
    metroTwoBrRentCostIsNA,
    metroTwoBrRentCostIsActive,
    stateList,
    stateListIsActive,
    stateMinWageMin,
    stateMinWageMax,
    stateMinWageIsNA,
    stateMinWageIsActive,
    stateOneBrRentCostMin,
    stateOneBrRentCostMax,
    stateOneBrRentCostIsNA,
    stateOneBrRentCostIsActive,
    stateTwoBrRentCostMin,
    stateTwoBrRentCostMax,
    stateTwoBrRentCostIsNA,
    stateTwoBrRentCostIsActive,
    stateMJStatus,
    stateMJStatusIsActive,
    stateMJMedicinalStatus,
    stateMJMedicinalStatusIsActive,
    stateMJCriminalStatus,
    stateMJCriminalStatusIsActive]);

  useEffect(() => {
    
    if (reduxState) {
      setCityPopulationMin(reduxState.cityPopulationMin);
      setCityPopulationMax(reduxState.cityPopulationMax);
      setCityPopulationIsNA(reduxState.cityPopulationIsNA);
      setCityPopulationIsActive(reduxState.cityPopulationIsActive);

      setCityDensityMin(reduxState.cityDensityMin);
      setCityDensityMax(reduxState.cityDensityMax);
      setCityDensityIsNA(reduxState.cityDensityIsNA);
      setCityDensityIsActive(reduxState.cityDensityIsActive);

      setCityMedianIncomeMin(reduxState.cityMedianIncomeMin);
      setCityMedianIncomeMax(reduxState.cityMedianIncomeMax);
      setCityMedianIncomeIsNA(reduxState.cityMedianIncomeIsNA);
      setCityMedianIncomeIsActive(reduxState.cityMedianIncomeIsActive);

      setCityViolentCrimeMin(reduxState.cityViolentCrimeMin);
      setCityViolentCrimeMax(reduxState.cityViolentCrimeMax);
      setCityViolentCrimeIsNA(reduxState.cityViolentCrimeIsNA);
      setCityViolentCrimeIsActive(reduxState.cityViolentCrimeIsActive);

      setCityPropertyCrimeMin(reduxState.cityPropertyCrimeMin);
      setCityPropertyCrimeMax(reduxState.cityPropertyCrimeMax);
      setCityPropertyCrimeIsNA(reduxState.cityPropertyCrimeIsNA);
      setCityPropertyCrimeIsActive(reduxState.cityPropertyCrimeIsActive);

      setCityOneBrRentCostMin(reduxState.cityOneBrRentCostMin);
      setCityOneBrRentCostMax(reduxState.cityOneBrRentCostMax);
      setCityOneBrRentCostIsNA(reduxState.cityOneBrRentCostIsNA);
      setCityOneBrRentCostIsActive(reduxState.cityOneBrRentCostIsActive);

      setCityTwoBrRentCostMin(reduxState.cityTwoBrRentCostMin);
      setCityTwoBrRentCostMax(reduxState.cityTwoBrRentCostMax);
      setCityTwoBrRentCostIsNA(reduxState.cityTwoBrRentCostIsNA);
      setCityTwoBrRentCostIsActive(reduxState.cityTwoBrRentCostIsActive);

      setCityMinBrews(reduxState.cityMinBrews);
      setCityMinBrewsIsNA(reduxState.cityMinBrewsIsNA);
      setCityMinBrewsIsActive(reduxState.cityMinBrewsIsActive);
      
      setCityIsFoodie(reduxState.cityIsFoodie);

      setCityIsStartup(reduxState.cityIsStartup);

      setMetroPopulationMin(reduxState.metroPopulationMin);
      setMetroPopulationMax(reduxState.metroPopulationMax);
      setMetroPopulationIsNA(reduxState.metroPopulationIsNA);
      setMetroPopulationIsActive(reduxState.metroPopulationIsActive);

      setMetroAQIMin(reduxState.metroAQIMin);
      setMetroAQIMax(reduxState.metroAQIMax);
      setMetroAQIIsNA(reduxState.metroAQIIsNA);
      setMetroAQIIsActive(reduxState.metroAQIIsActive);

      setMetroNWIMin(reduxState.metroNWIMin);
      setMetroNWIMax(reduxState.metroNWIMax);
      setMetroNWIIsNA(reduxState.metroNWIIsNA);
      setMetroNWIIsActive(reduxState.metroNWIIsActive);

      setMetroUnemploymentMin(reduxState.metroUnemploymentMin);
      setMetroUnemploymentMax(reduxState.metroUnemploymentMax);
      setMetroUnemploymentIsNA(reduxState.metroUnemploymentIsNA);
      setMetroUnemploymentIsActive(reduxState.metroUnemploymentIsActive);

      setMetroOneBrRentCostMin(reduxState.metroOneBrRentCostMin);
      setMetroOneBrRentCostMax(reduxState.metroOneBrRentCostMax);
      setMetroOneBrRentCostIsNA(reduxState.metroOneBrRentCostIsNA);
      setMetroOneBrRentCostIsActive(reduxState.metroOneBrRentCostIsActive);

      setMetroTwoBrRentCostMin(reduxState.metroTwoBrRentCostMin);
      setMetroTwoBrRentCostMax(reduxState.metroTwoBrRentCostMax);
      setMetroTwoBrRentCostIsNA(reduxState.metroTwoBrRentCostIsNA);
      setMetroTwoBrRentCostIsActive(reduxState.metroTwoBrRentCostIsActive);

      setStateList(reduxState.stateList);
      setStateListIsActive(reduxState.stateListIsActive);

      setStateMinWageMin(reduxState.stateMinWageMin);
      setStateMinWageMax(reduxState.stateMinWageMax);
      setStateMinWageIsNA(reduxState.stateMinWageIsNA);
      setStateMinWageIsActive(reduxState.stateMinWageIsActive);

      setStateOneBrRentCostMin(reduxState.stateOneBrRentCostMin);
      setStateOneBrRentCostMax(reduxState.stateOneBrRentCostMax);
      setStateOneBrRentCostIsNA(reduxState.stateOneBrRentCostIsNA);
      setStateOneBrRentCostIsActive(reduxState.stateOneBrRentCostIsActive);

      setStateTwoBrRentCostMin(reduxState.stateTwoBrRentCostMin);
      setStateTwoBrRentCostMax(reduxState.stateTwoBrRentCostMax);
      setStateTwoBrRentCostIsNA(reduxState.stateTwoBrRentCostIsNA);
      setStateTwoBrRentCostIsActive(reduxState.stateTwoBrRentCostIsActive);

      setStateMJStatus(reduxState.stateMJStatus);
      setStateMJStatusIsActive(reduxState.stateMJStatusIsActive);

      setStateMJMedicinalStatus(reduxState.stateMJMedicinalStatus);
      setStateMJMedicinalStatusIsActive(reduxState.stateMJMedicinalStatusIsActive);

      setStateMJCriminalStatus(reduxState.stateMJCriminalStatus);
      setStateMJCriminalStatusIsActive(reduxState.stateMJCriminalStatusIsActive);
      console.log('reduxState:', reduxState);
    }
  }, [reduxState]);

  useEffect(() => {
    updateLocalState();
  }, [cityPopulationMin,
    cityPopulationMax,
    cityPopulationIsNA,
    cityPopulationIsActive,
    cityDensityMin,
    cityDensityMax,
    cityDensityIsNA,
    cityDensityIsActive,
    cityMedianIncomeMin,
    cityMedianIncomeMax,
    cityMedianIncomeIsNA,
    cityMedianIncomeIsActive,
    cityViolentCrimeMin,
    cityViolentCrimeMax,
    cityViolentCrimeIsNA,
    cityViolentCrimeIsActive,
    cityPropertyCrimeMin,
    cityPropertyCrimeMax,
    cityPropertyCrimeIsNA,
    cityPropertyCrimeIsActive,
    cityOneBrRentCostMin,
    cityOneBrRentCostMax,
    cityOneBrRentCostIsNA,
    cityOneBrRentCostIsActive,
    cityTwoBrRentCostMin,
    cityTwoBrRentCostMax,
    cityTwoBrRentCostIsNA,
    cityTwoBrRentCostIsActive,
    cityMinBrews,
    cityMinBrewsIsNA,
    cityMinBrewsIsActive,
    cityIsFoodie,
    cityIsStartup,
    metroPopulationMin,
    metroPopulationMax,
    metroPopulationIsNA,
    metroPopulationIsActive,
    metroAQIMin,
    metroAQIMax,
    metroAQIIsNA,
    metroAQIIsActive,
    metroNWIMin,
    metroNWIMax,
    metroNWIIsNA,
    metroNWIIsActive,
    metroUnemploymentMin,
    metroUnemploymentMax,
    metroUnemploymentIsNA,
    metroUnemploymentIsActive,
    metroOneBrRentCostMin,
    metroOneBrRentCostMax,
    metroOneBrRentCostIsNA,
    metroOneBrRentCostIsActive,
    metroTwoBrRentCostMin,
    metroTwoBrRentCostMax,
    metroTwoBrRentCostIsNA,
    metroTwoBrRentCostIsActive,
    stateList,
    stateListIsActive,
    stateMinWageMin,
    stateMinWageMax,
    stateMinWageIsNA,
    stateMinWageIsActive,
    stateOneBrRentCostMin,
    stateOneBrRentCostMax,
    stateOneBrRentCostIsNA,
    stateOneBrRentCostIsActive,
    stateTwoBrRentCostMin,
    stateTwoBrRentCostMax,
    stateTwoBrRentCostIsNA,
    stateTwoBrRentCostIsActive,
    stateMJStatus,
    stateMJStatusIsActive,
    stateMJMedicinalStatus,
    stateMJMedicinalStatusIsActive,
    stateMJCriminalStatus,
    stateMJCriminalStatusIsActive]);

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

  // console.log(queryString);

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
            <MinMax name="City Population" questionMarkText="Enter minimum and maximum size for the city population" columnName="city_population" onMinChange={setCityPopulationMin} onMaxChange={setCityPopulationMax} onNAChange={setCityPopulationIsNA} isItActive={setCityPopulationIsActive} />
            <MinMax name="City Density" questionMarkText="Enter minimum and maximum size for the city density" columnName="city_density" onMinChange={setCityDensityMin} onMaxChange={setCityDensityMax} onNAChange={setCityDensityIsNA} isItActive={setCityDensityIsActive} />
            <MinMax name="City Median Income" questionMarkText="Enter minimum and maximum amount for the city median income" columnName="city_median_income" onMinChange={setCityMedianIncomeMin} onMaxChange={setCityMedianIncomeMax} onNAChange={setCityMedianIncomeIsNA} isItActive={setCityMedianIncomeIsActive} />
            <MinMax name="City Violent Crime" questionMarkText="Enter minimum and maximum numbers for violent crimes per 100K" columnName="city_crime_violent" onMinChange={setCityViolentCrimeMin} onMaxChange={setCityViolentCrimeMax} onNAChange={setCityViolentCrimeIsNA} isItActive={setCityViolentCrimeIsActive} />
            <MinMax name="City Property Crime" questionMarkText="Enter minimum and maximum numbers for property crimes per 100K" columnName="city_crime_property" onMinChange={setCityPropertyCrimeMin} onMaxChange={setCityPropertyCrimeMax} onNAChange={setCityPropertyCrimeIsNA} isItActive={setCityPropertyCrimeIsActive} />
            <MinMax name="City 1 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average one bedroom rent cost in the city area" columnName="city_one_br_price" onMinChange={setCityOneBrRentCostMin} onMaxChange={setCityOneBrRentCostMax} onNAChange={setCityOneBrRentCostIsNA} isItActive={setCityOneBrRentCostIsActive} />
            <MinMax name="City 2 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average two bedroom rent cost in the city area" columnName="city_two_br_price" onMinChange={setCityTwoBrRentCostMin} onMaxChange={setCityTwoBrRentCostMax} onNAChange={setCityTwoBrRentCostIsNA} isItActive={setCityTwoBrRentCostIsActive} />
            <TextField name="Min Breweries" questionMarkText="Enter minimum amount of breweries you want in the city" columnName="city_num_of_brews" onMinChange={setCityMinBrews} onNAChange={setCityMinBrewsIsNA} isItActive={setCityMinBrewsIsActive} />
            <Checkmark name="Is Foode" columnName="city_is_foodie" questionMarkText="Would you like to search among the foodie towns?" onCheckingChange={setCityIsFoodie} />
            <Checkmark name="Is Startup" columnName="city_is_startup" questionMarkText="Would you like to search among the towns best suitable for startups?" onCheckingChange={setCityIsStartup} />
          </Box>
          <Box sx={{ width: '30%', margin: '10px' }}>
            {/* This column is responsible for the Metro Level*/}
            <Typography variant="h5" component="h2" sx={{ marginBottom: '15px' }}>
              Metro
            </Typography>
            <MinMax name="Metro Population" questionMarkText="Enter minimum and maximum size for the metro area population" columnName="metro_population" onMinChange={setMetroPopulationMin} onMaxChange={setMetroPopulationMax} onNAChange={setMetroPopulationIsNA} isItActive={setMetroPopulationIsActive} />
            <MinMax name="Metro AQI" questionMarkText="Enter minimum and maximum amount for the air quality index in the metro area" columnName="metro_aqi" onMinChange={setMetroAQIMin} onMaxChange={setMetroAQIMax} onNAChange={setMetroAQIIsNA} isItActive={setMetroAQIIsActive} />
            <MinMax name="Metro NWI" questionMarkText="Enter minimum and maximum amount for the average national walking index in the metro area" columnName="metro_avg_nwi" onMinChange={setMetroNWIMin} onMaxChange={setMetroNWIMax} onNAChange={setMetroNWIIsNA} isItActive={setMetroNWIIsActive} />
            <MinMax name="Metro Unemployment Rate" questionMarkText="Enter minimum and maximum amounts for the average unemployment rate in teh metro area" columnName="metro_unemployment" onMinChange={setMetroUnemploymentMin} onMaxChange={setMetroUnemploymentMax} onNAChange={setMetroUnemploymentIsNA} isItActive={setMetroUnemploymentIsActive} />
            <MinMax name="Metro 1 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average one bedroom rent cost in the metro area" columnName="metro_one_br_price" onMinChange={setMetroOneBrRentCostMin} onMaxChange={setMetroOneBrRentCostMax} onNAChange={setMetroOneBrRentCostIsNA} isItActive={setMetroOneBrRentCostIsActive} />
            <MinMax name="Metro 2 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average two bedroom rent cost in the metro area" columnName="metro_two_br_price" onMinChange={setMetroTwoBrRentCostMin} onMaxChange={setMetroTwoBrRentCostMax} onNAChange={setMetroTwoBrRentCostIsNA} isItActive={setMetroTwoBrRentCostIsActive} />
          </Box>
          <Box sx={{ width: '30%', margin: '10px' }}>
            {/* This column is responsible for the State Level*/}
            <Typography variant="h5" component="h2" sx={{ marginBottom: '15px' }}>
              State
            </Typography>
            <SelectMany name="States" questionMarkText="Choose a US state" columnName="state" onSelectingChange={setStateList} isItActive={setStateListIsActive} />
            <MinMax name="State Min Wage" questionMarkText="Enter minimum and maximum values for the state minimum wage" columnName="state_min_wage" onMinChange={setStateMinWageMin} onMaxChange={setStateMinWageMax} onNAChange={setStateMinWageIsNA} isItActive={setStateMinWageIsActive} />
            <MinMax name="State 1 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average one bedroom rent cost in the state" columnName="state_one_br_price" onMinChange={setStateOneBrRentCostMin} onMaxChange={setStateOneBrRentCostMax} onNAChange={setStateOneBrRentCostIsNA} isItActive={setStateOneBrRentCostIsActive} />
            <MinMax name="State 2 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average two bedroom rent cost in the state" columnName="state_two_br_price" onMinChange={setStateTwoBrRentCostMin} onMaxChange={setStateTwoBrRentCostMax} onNAChange={setStateTwoBrRentCostIsNA} isItActive={setStateTwoBrRentCostIsActive} />
            <Dropdown name="Marijuana Legal Status" questionMarkText="Choose marijuana legal status if you are interested" columnName="mj_legal_status" onStatusChange={setStateMJStatus} isItActive={setStateMJStatusIsActive} />
            <Dropdown name="Marijuana Medicinal Status" questionMarkText="Choose marijuana medicinal status if you are interested" columnName="mj_medicinal" onStatusChange={setStateMJMedicinalStatus} isItActive={setStateMJMedicinalStatusIsActive} />
            <Dropdown name="Marijuana Criminal Status" questionMarkText="Choose marijuana criminal status" columnName="mj_decriminalized" trueValue="Decriminalized" falseValue="Criminalized" onStatusChange={setStateMJCriminalStatus} isItActive={setStateMJCriminalStatusIsActive} />
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