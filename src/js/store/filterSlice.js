import { createSlice } from '@reduxjs/toolkit';

// Here we are storing the state of the SearchBox
export const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        // City
        cityPopulationMin: null,
        cityPopulationMax: null,
        cityPopulationIsNA: null,
        cityPopulationIsActive: false,
        cityDensityMin: null,
        cityDensityMax: null,
        cityDensityIsNA: null,
        cityDensityIsActive: false,
        cityMedianIncomeMin: null,
        cityMedianIncomeMax: null,
        cityMedianIncomeIsNA: null,
        cityMedianIncomeIsActive: false,
        cityViolentCrimeMin: null,
        cityViolentCrimeMax: null,
        cityViolentCrimeIsNA: null,
        cityViolentCrimeIsActive: false,
        cityPropertyCrimeMin: null,
        cityPropertyCrimeMax: null,
        cityPropertyCrimeIsNA: null,
        cityPropertyCrimeIsActive: false,
        cityOneBrRentCostMin: null,
        cityOneBrRentCostMax: null,
        cityOneBrRentCostIsNA: null,
        cityOneBrRentCostIsActive: false,
        cityTwoBrRentCostMin: null,
        cityTwoBrRentCostMax: null,
        cityTwoBrRentCostIsNA: null,
        cityTwoBrRentCostIsActive: false,
        cityMinBrews: null,
        cityMinBrewsIsNA: null,
        cityMinBrewsIsActive: false,
        cityIsFoodie: false,
        cityIsStartup: false,
        // Metro
        metroPopulationMin: null,
        metroPopulationMax: null,
        metroPopulationIsNA: null,
        metroPopulationIsActive: false,
        metroAQIMin: null,
        metroAQIMax: null,
        metroAQIIsNA: null,
        metroAQIIsActive: false,
        metroNWIMin: null,
        metroNWIMax: null,
        metroNWIIsNA: null,
        metroNWIIsActive: false,
        metroUnemploymentMin: null,
        metroUnemploymentMax: null,
        metroUnemploymentIsNA: null,
        metroUnemploymentIsActive: false,
        metroOneBrRentCostMin: null,
        metroOneBrRentCostMax: null,
        metroOneBrRentCostIsNA: null,
        metroOneBrRentCostIsActive: false,
        metroTwoBrRentCostMin: null,
        metroTwoBrRentCostMax: null,
        metroTwoBrRentCostIsNA: null,
        metroTwoBrRentCostIsActive: false,
        // State
        stateList: null,
        stateListIsActive: false,
        stateMinWageMin: null,
        stateMinWageMax: null,
        stateMinWageIsNA: null,
        stateMinWageIsActive: false,
        stateOneBrRentCostMin: null,
        stateOneBrRentCostMax: null,
        stateOneBrRentCostIsNA: null,
        stateOneBrRentCostIsActive: false,
        stateTwoBrRentCostMin: null,
        stateTwoBrRentCostMax: null,
        stateTwoBrRentCostIsNA: null,
        stateTwoBrRentCostIsActive: false,
        stateMJStatus: null,
        stateMJStatusIsActive: false,
        stateMJMedicinalStatus: null,
        stateMJMedicinalStatusIsActive: false,
        stateMJCriminalStatus: null,
        stateMJCriminalStatusIsActive: false
    },
    reducers: {
        // City
        setCityPopulationMin: (state, action) => {
            state.cityPopulationMin = action.payload;
        },
        setCityPopulationMax: (state, action) => {
            state.cityPopulationMax = action.payload;
        },
        setCityPopulationIsNA: (state, action) => {
            state.cityPopulationIsNA = action.payload;
        },
        setCityPopulationIsActive: (state, action) => {
            state.cityPopulationIsActive = action.payload;
        },
        setCityDensityMin: (state, action) => {
            state.cityDensityMin = action.payload;
        },
        setCityDensityMax: (state, action) => {
            state.cityDensityMax = action.payload;
        },
        setCityDensityIsNA: (state, action) => {
            state.cityDensityIsNA = action.payload;
        },
        setCityDensityIsActive: (state, action) => {
            state.cityDensityIsActive = action.payload;
        },
        setCityMedianIncomeMin: (state, action) => {
            state.cityMedianIncomeMin = action.payload;
        },
        setCityMedianIncomeMax: (state, action) => {
            state.cityMedianIncomeMax = action.payload;
        },
        setCityMedianIncomeIsNA: (state, action) => {
            state.cityMedianIncomeIsNA = action.payload;
        },
        setCityMedianIncomeIsActive: (state, action) => {
            state.cityMedianIncomeIsActive = action.payload;
        },
        setCityViolentCrimeMin: (state, action) => {
            state.cityViolentCrimeMin = action.payload;
        },
        setCityViolentCrimeMax: (state, action) => {
            state.cityViolentCrimeMax = action.payload;
        },
        setCityViolentCrimeIsNA: (state, action) => {
            state.cityViolentCrimeIsNA = action.payload;
        },
        setCityViolentCrimeIsActive: (state, action) => {
            state.cityViolentCrimeIsActive = action.payload;
        },
        setCityPropertyCrimeMin: (state, action) => {
            state.cityPropertyCrimeMin = action.payload;
        },
        setCityPropertyCrimeMax: (state, action) => {
            state.cityPropertyCrimeMax = action.payload;
        },
        setCityPropertyCrimeIsNA: (state, action) => {
            state.cityPropertyCrimeIsNA = action.payload;
        },
        setCityPropertyCrimeIsActive: (state, action) => {
            state.cityPropertyCrimeIsActive = action.payload;
        },
        setCityOneBrRentCostMin: (state, action) => {
            state.cityOneBrRentCostMin = action.payload;
        },
        setCityOneBrRentCostMax: (state, action) => {
            state.cityOneBrRentCostMax = action.payload;
        },
        setCityOneBrRentCostIsNA: (state, action) => {
            state.cityOneBrRentCostIsNA = action.payload;
        },
        setCityOneBrRentCostIsActive: (state, action) => {
            state.cityOneBrRentCostIsActive = action.payload;
        },
        setCityTwoBrRentCostMin: (state, action) => {
            state.cityTwoBrRentCostMin = action.payload;
        },
        setCityTwoBrRentCostMax: (state, action) => {
            state.cityTwoBrRentCostMax = action.payload;
        },
        setCityTwoBrRentCostIsNA: (state, action) => {
            state.cityTwoBrRentCostIsNA = action.payload;
        },
        setCityTwoBrRentCostIsActive: (state, action) => {
            state.cityTwoBrRentCostIsActive = action.payload;
        },
        setCityMinBrews: (state, action) => {
            state.cityMinBrews = action.payload;
        },
        setCityMinBrewsIsNA: (state, action) => {
            state.cityMinBrewsIsNA = action.payload;
        },
        setCityMinBrewsIsActive: (state, action) => {
            state.cityMinBrewsIsActive = action.payload;
        },
        setCityIsFoodie: (state, action) => {
            state.cityIsFoodie = action.payload;
        },
        setCityIsStartup: (state, action) => {
            state.cityIsStartup = action.payload;
        },

        // Metro

        setMetroPopulationMin: (state, action) => {
            state.metroPopulationMin = action.payload;
        },
        setMetroPopulationMax: (state, action) => {
            state.metroPopulationMax = action.payload;
        },
        setMetroPopulationIsNA: (state, action) => {
            state.metroPopulationIsNA = action.payload;
        },
        setMetroPopulationIsActive: (state, action) => {
            state.metroPopulationIsActive = action.payload;
        },
        setMetroAQIMin: (state, action) => {
            state.metroAQIMin = action.payload;
        },
        setMetroAQIMax: (state, action) => {
            state.metroAQIMax = action.payload;
        },
        setMetroAQIIsNA: (state, action) => {
            state.metroAQIIsNA = action.payload;
        },
        setMetroAQIIsActive: (state, action) => {
            state.metroAQIIsActive = action.payload;
        },
        setMetroNWIMin: (state, action) => {
            state.metroNWIMin = action.payload;
        },
        setMetroNWIMax: (state, action) => {
            state.metroNWIMax = action.payload;
        },
        setMetroNWIIsNA: (state, action) => {
            state.metroNWIIsNA = action.payload;
        },
        setMetroNWIIsActive: (state, action) => {
            state.metroNWIIsActive = action.payload;
        },
        setMetroUnemploymentMin: (state, action) => {
            state.metroUnemploymentMin = action.payload;
        },
        setMetroUnemploymentMax: (state, action) => {
            state.metroUnemploymentMax = action.payload;
        },
        setMetroUnemploymentIsNA: (state, action) => {
            state.metroUnemploymentIsNA = action.payload;
        },
        setMetroUnemploymentIsActive: (state, action) => {
            state.metroUnemploymentIsActive = action.payload;
        },
        setMetroOneBrRentCostMin: (state, action) => {
            state.metroOneBrRentCostMin = action.payload;
        },
        setMetroOneBrRentCostMax: (state, action) => {
            state.metroOneBrRentCostMax = action.payload;
        },
        setMetroOneBrRentCostIsNA: (state, action) => {
            state.metroOneBrRentCostIsNA = action.payload;
        },
        setMetroOneBrRentCostIsActive: (state, action) => {
            state.metroOneBrRentCostIsActive = action.payload;
        },
        setMetroTwoBrRentCostMin: (state, action) => {
            state.metroTwoBrRentCostMin = action.payload;
        },
        setMetroTwoBrRentCostMax: (state, action) => {
            state.metroTwoBrRentCostMax = action.payload;
        },
        setMetroTwoBrRentCostIsNA: (state, action) => {
            state.metroTwoBrRentCostIsNA = action.payload;
        },
        setMetroTwoBrRentCostIsActive: (state, action) => {
            state.metroTwoBrRentCostIsActive = action.payload;
        },

        // State

        setStateList: (state, action) => {
            state.stateList = action.payload;
        },
        setStateListIsActive: (state, action) => {
            state.stateListIsActive = action.payload;
        },
        setStateMinWageMin: (state, action) => {
            state.stateMinWageMin = action.payload;
        },
        setStateMinWageMax: (state, action) => {
            state.stateMinWageMax = action.payload;
        },
        setStateMinWageIsNA: (state, action) => {
            state.stateMinWageIsNA = action.payload;
        },
        setStateMinWageIsActive: (state, action) => {
            state.stateMinWageIsActive = action.payload;
        },
        setStateOneBrRentCostMin: (state, action) => {
            state.stateOneBrRentCostMin = action.payload;
        },
        setStateOneBrRentCostMax: (state, action) => {
            state.stateOneBrRentCostMax = action.payload;
        },
        setStateOneBrRentCostIsNA: (state, action) => {
            state.stateOneBrRentCostIsNA = action.payload;
        },
        setStateOneBrRentCostIsActive: (state, action) => {
            state.stateOneBrRentCostIsActive = action.payload;
        },
        setStateTwoBrRentCostMin: (state, action) => {
            state.stateTwoBrRentCostMin = action.payload;
        },
        setStateTwoBrRentCostMax: (state, action) => {
            state.stateTwoBrRentCostMax = action.payload;
        },
        setStateTwoBrRentCostIsNA: (state, action) => {
            state.stateTwoBrRentCostIsNA = action.payload;
        },
        setStateTwoBrRentCostIsActive: (state, action) => {
            state.stateTwoBrRentCostIsActive = action.payload;
        },
        setStateMJStatus: (state, action) => {
            state.stateMJStatus = action.payload;
        },
        setStateMJStatusIsActive: (state, action) => {
            state.stateMJStatusIsActive = action.payload;
        },
        setStateMJMedicinalStatus: (state, action) => {
            state.stateMJMedicinalStatus = action.payload;
        },
        setStateMJMedicinalStatusIsActive: (state, action) => {
            state.stateMJMedicinalStatusIsActive = action.payload;
        },
        setStateMJCriminalStatus: (state, action) => {
            state.stateMJCriminalStatus = action.payload;
        },
        setStateMJCriminalStatusIsActive: (state, action) => {
            state.stateMJCriminalStatusIsActive = action.payload;
        },
    },
});

export const { 
    setCityPopulationMin,
    setCityPopulationMax,
    setCityPopulationIsNA,
    setCityPopulationIsActive,
    setCityDensityMin,
    setCityDensityMax,
    setCityDensityIsNA,
    setCityDensityIsActive,
    setCityMedianIncomeMin,
    setCityMedianIncomeMax,
    setCityMedianIncomeIsNA,
    setCityMedianIncomeIsActive,
    setCityViolentCrimeMin,
    setCityViolentCrimeMax,
    setCityViolentCrimeIsNA,
    setCityViolentCrimeIsActive,
    setCityPropertyCrimeMin,
    setCityPropertyCrimeMax,
    setCityPropertyCrimeIsNA,
    setCityPropertyCrimeIsActive,
    setCityOneBrRentCostMin,
    setCityOneBrRentCostMax,
    setCityOneBrRentCostIsNA,
    setCityOneBrRentCostIsActive,
    setCityTwoBrRentCostMin,
    setCityTwoBrRentCostMax,
    setCityTwoBrRentCostIsNA,
    setCityTwoBrRentCostIsActive,
    setCityMinBrews,
    setCityMinBrewsIsNA,
    setCityMinBrewsIsActive,
    setCityIsFoodie,
    setCityIsStartup,
    setMetroPopulationMin,
    setMetroPopulationMax,
    setMetroPopulationIsNA,
    setMetroPopulationIsActive,
    setMetroAQIMin,
    setMetroAQIMax,
    setMetroAQIIsNA,
    setMetroAQIIsActive,
    setMetroNWIMin,
    setMetroNWIMax,
    setMetroNWIIsNA,
    setMetroNWIIsActive,
    setMetroUnemploymentMin,
    setMetroUnemploymentMax,
    setMetroUnemploymentIsNA,
    setMetroUnemploymentIsActive,
    setMetroOneBrRentCostMin,
    setMetroOneBrRentCostMax,
    setMetroOneBrRentCostIsNA,
    setMetroOneBrRentCostIsActive,
    setMetroTwoBrRentCostMin,
    setMetroTwoBrRentCostMax,
    setMetroTwoBrRentCostIsNA,
    setMetroTwoBrRentCostIsActive,
    setStateList,
    setStateListIsActive,
    setStateMinWageMin,
    setStateMinWageMax,
    setStateMinWageIsNA,
    setStateMinWageIsActive,
    setStateOneBrRentCostMin,
    setStateOneBrRentCostMax,
    setStateOneBrRentCostIsNA,
    setStateOneBrRentCostIsActive,
    setStateTwoBrRentCostMin,
    setStateTwoBrRentCostMax,
    setStateTwoBrRentCostIsNA,
    setStateTwoBrRentCostIsActive,
    setStateMJStatus,
    setStateMJStatusIsActive,
    setStateMJMedicinalStatus,
    setStateMJMedicinalStatusIsActive,
    setStateMJCriminalStatus,
    setStateMJCriminalStatusIsActive
 } = filterSlice.actions;

export default filterSlice.reducer;
