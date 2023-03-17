import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import searchReducer from "./searchSlice"
import searchBoxSliceReducer from './searchBoxSlice';
import thunk from 'redux-thunk';

const middleware = [...getDefaultMiddleware(), thunk];

const initialState = {
  searchBoxSlice:
  {
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
  }
}

const store = configureStore({
  reducer: {
    search: searchReducer,
    searchBoxSlice: searchBoxSliceReducer,
  },
  middleware,
  preloadedState: initialState
});
store.subscribe(() => {
  console.log("Updated store:", store.getState());
});
export default store;