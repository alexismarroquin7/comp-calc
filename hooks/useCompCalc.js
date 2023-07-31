
import { useEffect, useReducer } from 'react';
import useLocalStorage from './useLocalStorage';

import { v4 as uuid } from "uuid";

const ACTION = {
  TAB: {
    SELECTED: {
      SET: "tab/selected/set"
    }
  },
  PRODUCTS_SOLD: {
    UPDATE: "productsSold/update"
  },
  HOURS_WORKED: {
    UPDATE: "hoursWorked/update"
  },
  HOURLY_RATE: {
    UPDATE: "hourlyRate/update"
  },
}


const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.TAB.SELECTED.SET:
      return {
        ...state,
        tab: {
          ...state.tab,
          selected: action.payload.selected
        }
      }
    case ACTION.PRODUCTS_SOLD.UPDATE:
      return {
        ...state,
        productsSold: {
          ...state.productsSold,
          ...action.payload.productsSold
        }
      }
    case ACTION.HOURS_WORKED.UPDATE:
      return {
        ...state,
        hoursWorked: action.payload.hoursWorked
      }
    case ACTION.HOURLY_RATE.UPDATE:
      return {
        ...state,
        hourlyRate: action.payload.hourlyRate
      }
    default:
      return state;
  }
};


const initialState = {
  productsSold: {
    all_iphone_models_dpp: 0,
    all_iphone_models_frp: 0,
    all_android_models_dpp: 0,
    all_android_models_frp: 0,
    all_basic_models_dpp: 0,
    all_basic_models_frp: 0,
    all_ipad_models_dpp: 0,
    all_ipad_models_frp: 0,
    all_android_models_dpp: 0,
    all_android_models_frp: 0,
    all_4g_hotspot_usb_modem_notebook_models_dpp: 0,
    all_4g_hotspot_usb_modem_notebook_models_frp: 0,
    all_5g_hotspot_usb_modem_notebook_models_dpp: 0,
    all_5g_hotspot_usb_modem_notebook_models_frp: 0,
    home_wireless_models_dpp: 0,
    home_wireless_models_frp: 0,
    other_connected_devices_dpp: 0,
    other_connected_devices_frp: 0,
    verizon_mobile_protection: 0,
    lte_home_internet: 0,
    fiveg_home_internet: 0,
    fiveg_home_internet_plus: 0,
  },
  hoursWorked: 0,
  hourlyRate: 0,
  tab: {
    list: [
      {
        id: uuid(),
        name: "products-sold"
      },
      {
        id: uuid(),
        name: "hours-worked"
      },
      {
        id: uuid(),
        name: "payout"
      }
    ],
    selected: "products-sold"
  }
};


export const useCompCalc = () => {
  const [storedState, setStoredState] = useLocalStorage('comp-calc-app', initialState);
  const [state, dispatch] = useReducer(reducer, storedState || initialState);

  useEffect(() => {
    setStoredState(state)
  }, [state, setStoredState]);

  const setTabSelected = (tabName) => {
    dispatch({
      type: ACTION.TAB.SELECTED.SET,
      payload: {
        selected: tabName
      }
    })
  }

  const updateProductsSold = (productsSold) => {
    dispatch({
      type: ACTION.PRODUCTS_SOLD.UPDATE,
      payload: {
        productsSold
      }
    })
  }

  const updateHoursWorked = (numOfHours = 0) => {
    dispatch({
      type: ACTION.HOURS_WORKED.UPDATE,
      payload: {
        hoursWorked: numOfHours
      }
    })
  }
  
  const updateHourlyRate = (rate = 0) => {
    dispatch({
      type: ACTION.HOURLY_RATE.UPDATE,
      payload: {
        hourlyRate: rate
      }
    })
  }

  return {
    state,
    dispatch,
    setTabSelected,
    updateProductsSold,
    updateHourlyRate,
    updateHoursWorked
  };
};