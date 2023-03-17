import React, { useEffect, memo } from 'react';
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
import searchSlice, { setResultsData } from '../store/searchSlice';
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
  setStateList, setStateListIsActive, setStateMinWageMin, setStateMinWageMax, setStateMinWageIsNA, setStateMinWageIsActive, setStateOneBrRentCostMin,
  setStateOneBrRentCostMax, setStateOneBrRentCostIsNA, setStateOneBrRentCostIsActive, setStateTwoBrRentCostMin, setStateTwoBrRentCostMax, setStateTwoBrRentCostIsNA,
  setStateTwoBrRentCostIsActive, setStateMJStatus, setStateMJStatusIsActive, setStateMJMedicinalStatus, setStateMJMedicinalStatusIsActive,
  setStateMJCriminalStatus, setStateMJCriminalStatusIsActive
} from '../store/filterSlice';

const SearchBox = ({ searchedData }) => {
  const URL = "http://localhost:5000"; // Replace from keys
  const { handleSearch } = useSearch();
  const dispatch = useDispatch();

  const cityPopulationMin = useSelector((state) => state.filters.cityPopulationMin);
  const cityPopulationMax = useSelector((state) => state.filters.cityPopulationMax);
  const cityPopulationIsNA = useSelector((state) => state.filters.cityPopulationIsNA);
  const cityPopulationIsActive = useSelector((state) => state.filters.cityPopulationIsActive);
  const cityDensityMin = useSelector((state) => state.filters.cityDensityMin);
  const cityDensityMax = useSelector((state) => state.filters.cityDensityMax);
  const cityDensityIsNA = useSelector((state) => state.filters.cityDensityIsNA);
  const cityDensityIsActive = useSelector((state) => state.filters.cityDensityIsActive);
  const cityMedianIncomeMin = useSelector((state) => state.filters.cityMedianIncomeMin);
  const cityMedianIncomeMax = useSelector((state) => state.filters.cityMedianIncomeMax);
  const cityMedianIncomeIsNA = useSelector((state) => state.filters.cityMedianIncomeIsNA);
  const cityMedianIncomeIsActive = useSelector((state) => state.filters.cityMedianIncomeIsActive);
  const cityViolentCrimeMin = useSelector((state) => state.filters.cityViolentCrimeMin);
  const cityViolentCrimeMax = useSelector((state) => state.filters.cityViolentCrimeMax);
  const cityViolentCrimeIsNA = useSelector((state) => state.filters.cityViolentCrimeIsNA);
  const cityViolentCrimeIsActive = useSelector((state) => state.filters.cityViolentCrimeIsActive);
  const cityPropertyCrimeMin = useSelector((state) => state.filters.cityPropertyCrimeMin);
  const cityPropertyCrimeMax = useSelector((state) => state.filters.cityPropertyCrimeMax);
  const cityPropertyCrimeIsNA = useSelector((state) => state.filters.cityPropertyCrimeIsNA);
  const cityPropertyCrimeIsActive = useSelector((state) => state.filters.cityPropertyCrimeIsActive);
  const cityOneBrRentCostMin = useSelector((state) => state.filters.cityOneBrRentCostMin);
  const cityOneBrRentCostMax = useSelector((state) => state.filters.cityOneBrRentCostMax);
  const cityOneBrRentCostIsNA = useSelector((state) => state.filters.cityOneBrRentCostIsNA);
  const cityOneBrRentCostIsActive = useSelector((state) => state.filters.cityOneBrRentCostIsActive);
  const cityTwoBrRentCostMin = useSelector((state) => state.filters.cityTwoBrRentCostMin);
  const cityTwoBrRentCostMax = useSelector((state) => state.filters.cityTwoBrRentCostMax);
  const cityTwoBrRentCostIsNA = useSelector((state) => state.filters.cityTwoBrRentCostIsNA);
  const cityTwoBrRentCostIsActive = useSelector((state) => state.filters.cityTwoBrRentCostIsActive);
  const cityMinBrews = useSelector((state) => state.filters.cityMinBrews);
  const cityMinBrewsIsNA = useSelector((state) => state.filters.cityMinBrewsIsNA);
  const cityMinBrewsIsActive = useSelector((state) => state.filters.cityMinBrewsIsActive);
  const cityIsFoodie = useSelector((state) => state.filters.cityIsFoodie);
  const cityIsStartup = useSelector((state) => state.filters.cityIsStartup);
  // Metro
  const metroPopulationMin = useSelector((state) => state.filters.metroPopulationMin);
  const metroPopulationMax = useSelector((state) => state.filters.metroPopulationMax);
  const metroPopulationIsNA = useSelector((state) => state.filters.metroPopulationIsNA);
  const metroPopulationIsActive = useSelector((state) => state.filters.metroPopulationIsActive);
  const metroAQIMin = useSelector((state) => state.filters.metroAQIMin);
  const metroAQIMax = useSelector((state) => state.filters.metroAQIMax);
  const metroAQIIsNA = useSelector((state) => state.filters.metroAQIIsNA);
  const metroAQIIsActive = useSelector((state) => state.filters.metroAQIIsActive);
  const metroNWIMin = useSelector((state) => state.filters.metroNWIMin);
  const metroNWIMax = useSelector((state) => state.filters.metroNWIMax);
  const metroNWIIsNA = useSelector((state) => state.filters.metroNWIIsNA);
  const metroNWIIsActive = useSelector((state) => state.filters.metroNWIIsActive);
  const metroUnemploymentMin = useSelector((state) => state.filters.metroUnemploymentMin);
  const metroUnemploymentMax = useSelector((state) => state.filters.metroUnemploymentMax);
  const metroUnemploymentIsNA = useSelector((state) => state.filters.metroUnemploymentIsNA);
  const metroUnemploymentIsActive = useSelector((state) => state.filters.metroUnemploymentIsActive);
  const metroOneBrRentCostMin = useSelector((state) => state.filters.metroOneBrRentCostMin);
  const metroOneBrRentCostMax = useSelector((state) => state.filters.metroOneBrRentCostMax);
  const metroOneBrRentCostIsNA = useSelector((state) => state.filters.metroOneBrRentCostIsNA);
  const metroOneBrRentCostIsActive = useSelector((state) => state.filters.metroOneBrRentCostIsActive);
  const metroTwoBrRentCostMin = useSelector((state) => state.filters.metroTwoBrRentCostMin);
  const metroTwoBrRentCostMax = useSelector((state) => state.filters.metroTwoBrRentCostMax);
  const metroTwoBrRentCostIsNA = useSelector((state) => state.filters.metroTwoBrRentCostIsNA);
  const metroTwoBrRentCostIsActive = useSelector((state) => state.filters.metroTwoBrRentCostIsActive);
  // State
  const stateList = useSelector((state) => state.filters.stateList);
  const stateListIsActive = useSelector((state) => state.filters.stateListIsActive);
  const stateMinWageMin = useSelector((state) => state.filters.stateMinWageMin);
  const stateMinWageMax = useSelector((state) => state.filters.stateMinWageMax);
  const stateMinWageIsNA = useSelector((state) => state.filters.stateMinWageIsNA);
  const stateMinWageIsActive = useSelector((state) => state.filters.stateMinWageIsActive);
  const stateOneBrRentCostMin = useSelector((state) => state.filters.stateOneBrRentCostMin);
  const stateOneBrRentCostMax = useSelector((state) => state.filters.stateOneBrRentCostMax);
  const stateOneBrRentCostIsNA = useSelector((state) => state.filters.stateOneBrRentCostIsNA);
  const stateOneBrRentCostIsActive = useSelector((state) => state.filters.stateOneBrRentCostIsActive);
  const stateTwoBrRentCostMin = useSelector((state) => state.filters.stateTwoBrRentCostMin);
  const stateTwoBrRentCostMax = useSelector((state) => state.filters.stateTwoBrRentCostMax);
  const stateTwoBrRentCostIsNA = useSelector((state) => state.filters.stateTwoBrRentCostIsNA);
  const stateTwoBrRentCostIsActive = useSelector((state) => state.filters.stateTwoBrRentCostIsActive);
  const stateMJStatus = useSelector((state) => state.filters.stateMJStatus);
  const stateMJStatusIsActive = useSelector((state) => state.filters.stateMJStatusIsActive);
  const stateMJMedicinalStatus = useSelector((state) => state.filters.stateMJMedicinalStatus);
  const stateMJMedicinalStatusIsActive = useSelector((state) => state.filters.stateMJMedicinalStatusIsActive);
  const stateMJCriminalStatus = useSelector((state) => state.filters.stateMJCriminalStatus);
  const stateMJCriminalStatusIsActive = useSelector((state) => state.filters.stateMJCriminalStatusIsActive);

  // Building a query string
  let queryString = "";

  // CITY

  // Adding city population data
  useEffect(() => {
  if (cityPopulationIsActive === true) {
    let min, max;
    if (cityPopulationMin === null) { min = 0 } else { min = cityPopulationMin };
    if (cityPopulationMax === null) { max = 0 } else { max = cityPopulationMax };
    queryString += "city_population_min=" + min + "&" + "city_population_max=" + max + "&";
    if (cityPopulationIsNA === true) {
      queryString += "city_population_null_is_ok=true&"
    } else { queryString += "city_population_null_is_ok=false&" }
    dispatch(setCityPopulationMin(min));
    dispatch(setCityPopulationMax(max));
    dispatch(setCityPopulationIsNA(cityPopulationIsNA));
    dispatch(setCityPopulationIsActive(cityPopulationIsActive));
  } else {
    dispatch(setCityPopulationMin(null));
    dispatch(setCityPopulationMax(null));
    dispatch(setCityPopulationIsNA(null));
    dispatch(setCityPopulationIsActive(false));
  }
}, [dispatch, setCityPopulationIsActive, setCityPopulationMin, setCityPopulationMax, setCityPopulationIsNA]);

  // Adding city density data
  if (cityDensityIsActive === true) {
    let min, max;
    if (cityDensityMin === null) { min = 0 } else { min = cityDensityMin };
    if (cityDensityMax === null) { max = 0 } else { max = cityDensityMax };
    queryString += "city_density_min=" + min + "&" + "city_density_max=" + max + "&";
    if (cityDensityIsNA === true) {
      queryString += "city_density_null_is_ok=true&"
    } else { queryString += "city_density_null_is_ok=false&" }
    dispatch(setCityDensityMin(min));
    dispatch(setCityDensityMax(max));
    dispatch(setCityDensityIsNA(cityDensityIsNA));
    dispatch(setCityDensityIsActive(cityDensityIsActive));
  } else {
    dispatch(setCityDensityMin(null));
    dispatch(setCityDensityMax(null));
    dispatch(setCityDensityIsNA(null));
    dispatch(setCityDensityIsActive(false));
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
    dispatch(setCityMedianIncomeMin(min));
    dispatch(setCityMedianIncomeMax(max));
    dispatch(setCityMedianIncomeIsNA(cityMedianIncomeIsNA));
    dispatch(setCityMedianIncomeIsActive(cityDensityIsActive));
  } else {
    dispatch(setCityMedianIncomeMin(null));
    dispatch(setCityMedianIncomeMax(null));
    dispatch(setCityMedianIncomeIsNA(null));
    dispatch(setCityMedianIncomeIsActive(false));
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
    dispatch(setCityViolentCrimeMin(min));
    dispatch(setCityViolentCrimeMax(max));
    dispatch(setCityViolentCrimeIsNA(cityViolentCrimeIsNA));
    dispatch(setCityViolentCrimeIsActive(cityViolentCrimeIsActive));
  } else {
    dispatch(setCityViolentCrimeMin(null));
    dispatch(setCityViolentCrimeMax(null));
    dispatch(setCityViolentCrimeIsNA(null));
    dispatch(setCityViolentCrimeIsActive(false));
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
    dispatch(setCityPropertyCrimeMin(min));
    dispatch(setCityPropertyCrimeMax(max));
    dispatch(setCityPropertyCrimeIsNA(cityPropertyCrimeIsNA));
    dispatch(setCityPropertyCrimeIsActive(cityPropertyCrimeIsActive));
  } else {
    dispatch(setCityPropertyCrimeMin(null));
    dispatch(setCityPropertyCrimeMax(null));
    dispatch(setCityPropertyCrimeIsNA(null));
    dispatch(setCityPropertyCrimeIsActive(false));
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
    dispatch(setCityOneBrRentCostMin(min));
    dispatch(setCityOneBrRentCostMax(max));
    dispatch(setCityOneBrRentCostIsNA(cityOneBrRentCostIsNA));
    dispatch(setCityOneBrRentCostIsActive(cityOneBrRentCostIsActive));
  } else {
    dispatch(setCityOneBrRentCostMin(null));
    dispatch(setCityOneBrRentCostMax(null));
    dispatch(setCityOneBrRentCostIsNA(null));
    dispatch(setCityOneBrRentCostIsActive(false));
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
    dispatch(setCityTwoBrRentCostMin(min));
    dispatch(setCityTwoBrRentCostMax(max));
    dispatch(setCityTwoBrRentCostIsNA(cityTwoBrRentCostIsNA));
    dispatch(setCityTwoBrRentCostIsActive(cityTwoBrRentCostIsActive));
  } else {
    dispatch(setCityTwoBrRentCostMin(null));
    dispatch(setCityTwoBrRentCostMax(null));
    dispatch(setCityTwoBrRentCostIsNA(null));
    dispatch(setCityTwoBrRentCostIsActive(false));
  }

  // Adding city minimum breweries
  if (cityMinBrewsIsActive === true) {
    let min;
    if (cityMinBrews === null) { min = 0 } else { min = cityMinBrews };
    queryString += "city_num_of_brews=" + min + "&";
    if (cityMinBrewsIsNA === true) {
      queryString += "city_num_of_brews_null_is_ok=true&"
    } else { queryString += "city_num_of_brews_null_is_ok=false&" }
    dispatch(setCityMinBrews(min));
    dispatch(setCityMinBrewsIsNA(cityMinBrewsIsNA));
    dispatch(setCityMinBrewsIsActive(cityMinBrewsIsActive));
  } else {
    dispatch(setCityMinBrews(null));
    dispatch(setCityMinBrewsIsNA(null));
    dispatch(setCityMinBrewsIsActive(false));
  }

  // Adding a foodie city check
  if (cityIsFoodie === true) {
    queryString += "city_is_foodie=TRUE&"
    dispatch(setCityIsFoodie(cityIsFoodie))
  } else {
    dispatch(setCityIsFoodie(false))
  }

  // Adding a startup city check
  if (cityIsStartup === true) {
    queryString += "city_is_startup=TRUE&"
    dispatch(setCityIsStartup(cityIsStartup))
  } else {
    dispatch(setCityIsStartup(false))
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
    dispatch(setMetroPopulationMin(min));
    dispatch(setMetroPopulationMax(max));
    dispatch(setMetroPopulationIsNA(metroPopulationIsNA));
    dispatch(setMetroPopulationIsActive(metroPopulationIsActive));
  } else {
    dispatch(setMetroPopulationMin(null));
    dispatch(setMetroPopulationMax(null));
    dispatch(setMetroPopulationIsNA(null));
    dispatch(setMetroPopulationIsActive(false));
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
    dispatch(setMetroAQIMin(min));
    dispatch(setMetroAQIMax(max));
    dispatch(setMetroAQIIsNA(metroAQIIsNA));
    dispatch(setMetroAQIIsActive(metroAQIIsActive));
  } else {
    dispatch(setMetroAQIMin(null));
    dispatch(setMetroAQIMax(null));
    dispatch(setMetroAQIIsNA(null));
    dispatch(setMetroAQIIsActive(false));
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
    dispatch(setMetroNWIMin(min));
    dispatch(setMetroNWIMax(max));
    dispatch(setMetroNWIIsNA(metroNWIIsNA));
    dispatch(setMetroNWIIsActive(metroNWIIsActive));
  } else {
    dispatch(setMetroNWIMin(null));
    dispatch(setMetroNWIMax(null));
    dispatch(setMetroNWIIsNA(null));
    dispatch(setMetroNWIIsActive(false));
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
    dispatch(setMetroUnemploymentMin(min));
    dispatch(setMetroUnemploymentMax(max));
    dispatch(setMetroUnemploymentIsNA(metroUnemploymentIsNA));
    dispatch(setMetroUnemploymentIsActive(metroUnemploymentIsActive));
  } else {
    dispatch(setMetroUnemploymentMin(null));
    dispatch(setMetroUnemploymentMax(null));
    dispatch(setMetroUnemploymentIsNA(null));
    dispatch(setMetroUnemploymentIsActive(false));
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
    dispatch(setMetroOneBrRentCostMin(min));
    dispatch(setMetroOneBrRentCostMax(max));
    dispatch(setMetroOneBrRentCostIsNA(metroOneBrRentCostIsNA));
    dispatch(setMetroOneBrRentCostIsActive(metroOneBrRentCostIsActive));
  } else {
    dispatch(setMetroOneBrRentCostMin(null));
    dispatch(setMetroOneBrRentCostMax(null));
    dispatch(setMetroOneBrRentCostIsNA(null));
    dispatch(setMetroOneBrRentCostIsActive(false));
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
    dispatch(setMetroTwoBrRentCostMin(min));
    dispatch(setMetroTwoBrRentCostMax(max));
    dispatch(setMetroTwoBrRentCostIsNA(metroTwoBrRentCostIsNA));
    dispatch(setMetroTwoBrRentCostIsActive(metroTwoBrRentCostIsActive));
  } else {
    dispatch(setMetroTwoBrRentCostMin(null));
    dispatch(setMetroTwoBrRentCostMax(null));
    dispatch(setMetroTwoBrRentCostIsNA(null));
    dispatch(setMetroTwoBrRentCostIsActive(false));
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
    dispatch(setStateList(stateList));
    dispatch(setStateListIsActive(stateListIsActive));
  } else {
    dispatch(setStateList(null));
    dispatch(setStateListIsActive(false));
  }

  // Adding state minimum wage
  if (stateMinWageIsActive === true) {
    let min, max;
    if (stateMinWageMin === null) { min = 0 } else { min = stateMinWageMin };
    if (stateMinWageMax === null) { max = 0 } else { max = stateMinWageMax };
    queryString += "state_min_wage_min=" + min + "&" + "state_min_wage_max=" + max + "&";
    dispatch(setStateMinWageMin(min));
    dispatch(setStateMinWageMax(max));
    dispatch(setStateMinWageIsActive(stateMinWageIsActive));
  } else {
    dispatch(setStateMinWageMin(null));
    dispatch(setStateMinWageMax(null));
    dispatch(setStateMinWageIsActive(false));
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
    dispatch(setStateOneBrRentCostMin(min));
    dispatch(setStateOneBrRentCostMax(max));
    dispatch(setStateOneBrRentCostIsNA(stateOneBrRentCostIsNA));
    dispatch(setStateOneBrRentCostIsActive(stateOneBrRentCostIsActive));
  } else {
    dispatch(setStateOneBrRentCostMin(null));
    dispatch(setStateOneBrRentCostMax(null));
    dispatch(setStateOneBrRentCostIsNA(null));
    dispatch(setStateOneBrRentCostIsActive(false));
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
    dispatch(setStateTwoBrRentCostMin(min));
    dispatch(setStateTwoBrRentCostMax(max));
    dispatch(setStateTwoBrRentCostIsNA(stateTwoBrRentCostIsNA));
    dispatch(setStateTwoBrRentCostIsActive(stateTwoBrRentCostIsActive));
  } else {
    dispatch(setStateTwoBrRentCostMin(null));
    dispatch(setStateTwoBrRentCostMax(null));
    dispatch(setStateTwoBrRentCostIsNA(null));
    dispatch(setStateTwoBrRentCostIsActive(false));
  }

  // Marijuana legal status

  if (stateMJStatusIsActive === true) {
    queryString += "state_mj_legal_status=" + stateMJStatus + "&";
    dispatch(setStateMJStatusIsActive(stateMJStatusIsActive));
  } else {
    dispatch(setStateMJStatusIsActive(false));
  }

  // Marijuana medicinal status

  if (stateMJMedicinalStatusIsActive === true) {
    queryString += "state_mj_medicinal=" + stateMJMedicinalStatus + "&";
    dispatch(setStateMJMedicinalStatusIsActive(stateMJMedicinalStatusIsActive));
  } else {
    dispatch(setStateMJMedicinalStatusIsActive(false));
  }

  // Marijuana criminal status

  if (stateMJCriminalStatusIsActive === true && stateMJCriminalStatus) {
    if (stateMJCriminalStatus === "Criminalized") {
      queryString += "state_mj_decriminalized=FALSE&";
    } else if (stateMJCriminalStatus === "Decriminalized") {
      queryString += "state_mj_decriminalized=TRUE&";
    }
    dispatch(setStateMJCriminalStatusIsActive(stateMJCriminalStatusIsActive));
  } else if (stateMJCriminalStatusIsActive === false) {
    queryString += "";
    dispatch(setStateMJCriminalStatusIsActive(stateMJCriminalStatusIsActive));
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
            <MinMax name="City Population" questionMarkText="Enter minimum and maximum size for the city population" columnName="city_population" onMinChange={(value) => dispatch(setCityPopulationMin(value))} onMaxChange={(value) => dispatch(setCityPopulationMax(value))} onNAChange={(value) => dispatch(setCityPopulationIsNA(value))} isItActive={(value) => dispatch(setCityPopulationIsActive(value))} />
            <MinMax name="City Density" questionMarkText="Enter minimum and maximum size for the city density" columnName="city_density" onMinChange={(value) => dispatch(setCityDensityMin(value))} onMaxChange={(value) => dispatch(setCityDensityMax(value))} onNAChange={(value) => dispatch(setCityDensityIsNA(value))} isItActive={(value) => dispatch(setCityDensityIsActive(value))} />
            <MinMax name="City Median Income" questionMarkText="Enter minimum and maximum amount for the city median income" columnName="city_median_income" onMinChange={(value) => dispatch(setCityMedianIncomeMin(value))} onMaxChange={(value) => dispatch(setCityMedianIncomeMax(value))} onNAChange={(value) => dispatch(setCityMedianIncomeIsNA(value))} isItActive={(value) => dispatch(setCityMedianIncomeIsActive(value))} />
            <MinMax name="City Violent Crime" questionMarkText="Enter minimum and maximum numbers for violent crimes per 100K" columnName="city_crime_violent" onMinChange={(value) => dispatch(setCityViolentCrimeMin(value))} onMaxChange={(value) => dispatch(setCityViolentCrimeMax(value))} onNAChange={(value) => dispatch(setCityViolentCrimeIsNA(value))} isItActive={(value) => dispatch(setCityViolentCrimeIsActive(value))} />
            <MinMax name="City Property Crime" questionMarkText="Enter minimum and maximum numbers for property crimes per 100K" columnName="city_crime_property" onMinChange={(value) => dispatch(setCityPropertyCrimeMin(value))} onMaxChange={(value) => dispatch(setCityPropertyCrimeMax(value))} onNAChange={(value) => dispatch(setCityPropertyCrimeIsNA(value))} isItActive={(value) => dispatch(setCityPropertyCrimeIsActive(value))} />
            <MinMax name="City 1 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average one bedroom rent cost in the city area" columnName="city_one_br_price" onMinChange={(value) => dispatch(setCityOneBrRentCostMin(value))} onMaxChange={(value) => dispatch(setCityOneBrRentCostMax(value))} onNAChange={(value) => dispatch(setCityOneBrRentCostIsNA(value))} isItActive={(value) => dispatch(setCityOneBrRentCostIsActive(value))} />
            <MinMax name="City 2 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average two bedroom rent cost in the city area" columnName="city_two_br_price" onMinChange={(value) => dispatch(setCityTwoBrRentCostMin(value))} onMaxChange={(value) => dispatch(setCityTwoBrRentCostMax(value))} onNAChange={(value) => dispatch(setCityTwoBrRentCostIsNA(value))} isItActive={(value) => dispatch(setCityTwoBrRentCostIsActive(value))} />
            <TextField name="Min Breweries" questionMarkText="Enter minimum amount of breweries you want in the city" columnName="city_num_of_brews" onMinChange={(value) => dispatch(setCityMinBrews(value))} onNAChange={(value) => dispatch(setCityMinBrewsIsNA(value))} isItActive={(value) => dispatch(setCityMinBrewsIsActive(value))} />
            <Checkmark name="Is Foode" columnName="city_is_foodie" questionMarkText="Would you like to search among the foodie towns?" onCheckingChange={(value) => dispatch(setCityIsFoodie(value))} />
            <Checkmark name="Is Startup" columnName="city_is_startup" questionMarkText="Would you like to search among the towns best suitable for startups?" onCheckingChange={(value) => dispatch(setCityIsStartup(value))} />
          </Box>
          <Box sx={{ width: '30%', margin: '10px' }}>
            {/* This column is responsible for the Metro Level*/}
            <Typography variant="h5" component="h2" sx={{ marginBottom: '15px' }}>
              Metro
            </Typography>
            <MinMax name="Metro Population" questionMarkText="Enter minimum and maximum size for the metro area population" columnName="metro_population" onMinChange={(value) => dispatch(setMetroPopulationMin(value))} onMaxChange={(value) => dispatch(setMetroPopulationMax(value))} onNAChange={(value) => dispatch(setMetroPopulationIsNA(value))} isItActive={(value) => dispatch(setMetroPopulationIsActive(value))} />
            <MinMax name="Metro AQI" questionMarkText="Enter minimum and maximum amount for the air quality index in the metro area" columnName="metro_aqi" onMinChange={(value) => dispatch(setMetroAQIMin(value))} onMaxChange={(value) => dispatch(setMetroAQIMax(value))} onNAChange={(value) => dispatch(setMetroAQIIsNA(value))} isItActive={(value) => dispatch(setMetroAQIIsActive(value))} />
            <MinMax name="Metro NWI" questionMarkText="Enter minimum and maximum amount for the average national walking index in the metro area" columnName="metro_avg_nwi" onMinChange={(value) => dispatch(setMetroNWIMin(value))} onMaxChange={(value) => dispatch(setMetroNWIMax(value))} onNAChange={(value) => dispatch(setMetroNWIIsNA(value))} isItActive={(value) => dispatch(setMetroNWIIsActive(value))} />
            <MinMax name="Metro Unemployment Rate" questionMarkText="Enter minimum and maximum amounts for the average unemployment rate in teh metro area" columnName="metro_unemployment" onMinChange={(value) => dispatch(setMetroUnemploymentMin(value))} onMaxChange={(value) => dispatch(setMetroUnemploymentMax(value))} onNAChange={(value) => dispatch(setMetroUnemploymentIsNA(value))} isItActive={(value) => dispatch(setMetroUnemploymentIsActive(value))} />
            <MinMax name="Metro 1 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average one bedroom rent cost in the metro area" columnName="metro_one_br_price" onMinChange={(value) => dispatch(setMetroOneBrRentCostMin(value))} onMaxChange={(value) => dispatch(setMetroOneBrRentCostMax(value))} onNAChange={(value) => dispatch(setMetroOneBrRentCostIsNA(value))} isItActive={(value) => dispatch(setMetroOneBrRentCostIsActive(value))} />
            <MinMax name="Metro 2 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average two bedroom rent cost in the metro area" columnName="metro_two_br_price" onMinChange={(value) => dispatch(setMetroTwoBrRentCostMin(value))} onMaxChange={(value) => dispatch(setMetroTwoBrRentCostMax(value))} onNAChange={(value) => dispatch(setMetroTwoBrRentCostIsNA(value))} isItActive={(value) => dispatch(setMetroTwoBrRentCostIsActive(value))} />
          </Box>
          <Box sx={{ width: '30%', margin: '10px' }}>
            {/* This column is responsible for the State Level*/}
            <Typography variant="h5" component="h2" sx={{ marginBottom: '15px' }}>
              State
            </Typography>
            <SelectMany name="States" questionMarkText="Choose a US state" columnName="state" onSelectingChange={(value) => dispatch(setStateList(value))} isItActive={(value) => dispatch(setStateListIsActive(value))} />
            <MinMax name="State Min Wage" questionMarkText="Enter minimum and maximum values for the state minimum wage" columnName="state_min_wage" onMinChange={(value) => dispatch(setStateMinWageMin(value))} onMaxChange={(value) => dispatch(setStateMinWageMax(value))} onNAChange={(value) => dispatch(setStateMinWageIsNA(value))} isItActive={(value) => dispatch(setStateMinWageIsActive(value))} />
            <MinMax name="State 1 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average one bedroom rent cost in the state" columnName="state_one_br_price" onMinChange={(value) => dispatch(setStateOneBrRentCostMin(value))} onMaxChange={(value) => dispatch(setStateOneBrRentCostMax(value))} onNAChange={(value) => dispatch(setStateOneBrRentCostIsNA(value))} isItActive={(value) => dispatch(setStateOneBrRentCostIsActive(value))} />
            <MinMax name="State 2 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average two bedroom rent cost in the state" columnName="state_two_br_price" onMinChange={(value) => dispatch(setStateTwoBrRentCostMin(value))} onMaxChange={(value) => dispatch(setStateTwoBrRentCostMax(value))} onNAChange={(value) => dispatch(setStateTwoBrRentCostIsNA(value))} isItActive={(value) => dispatch(setStateTwoBrRentCostIsActive(value))} />
            <Dropdown name="Marijuana Legal Status" questionMarkText="Choose marijuana legal status if you are interested" columnName="mj_legal_status" onStatusChange={(value) => dispatch(setStateMJStatus(value))} isItActive={(value) => dispatch(setStateMJStatusIsActive(value))} />
            <Dropdown name="Marijuana Medicinal Status" questionMarkText="Choose marijuana medicinal status if you are interested" columnName="mj_medicinal" onStatusChange={(value) => dispatch(setStateMJMedicinalStatus(value))} isItActive={(value) => dispatch(setStateMJMedicinalStatusIsActive(value))} />
            <Dropdown name="Marijuana Criminal Status" questionMarkText="Choose marijuana criminal status" columnName="mj_decriminalized" trueValue="Decriminalized" falseValue="Criminalized" onStatusChange={(value) => dispatch(setStateMJCriminalStatus(value))} isItActive={(value) => dispatch(setStateMJCriminalStatusIsActive(value))} />
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
export default memo(SearchBox);