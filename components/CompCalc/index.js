"use client";
import { useCompCalc } from "@/hooks";

import { Tabs } from "./Tabs";
import { ProductsSold } from "./ProductsSold"
import { Payout } from "./Payout"
import { HoursWorked } from "./HoursWorked";

import styles from "./index.module.css";
import { useEffect, useState } from "react";

export const CompCalc = () => {
  const {
    state,
    setTabSelected,
    updateProductsSold,
    updateHourlyRate,
    updateHoursWorked
  } = useCompCalc();

  const [tabToUse, setTabToUse] = useState("");

  useEffect(() => {
    setTabToUse(state.tab.selected)
  }, [state.tab.selected, setTabToUse]);

  return (
    <div
      className={styles.root}
    >
      <h1>Comp Calc</h1>

      {tabToUse === "products-sold" && (
        <ProductsSold 
          productsSold={state.productsSold}
          update={updateProductsSold}
        />
      )}
      {tabToUse === "hours-worked" && (
        <HoursWorked 
          hoursWorked={state.hoursWorked}
          hourlyRate={state.hourlyRate}
          update={(formValues) => {
            updateHoursWorked(formValues.hoursWorked);
            updateHourlyRate(formValues.hourlyRate);
          }}
        />
      )}
      {tabToUse === "payout" && (
        <Payout 
          productsSold={state.productsSold}
          
          hourlyRate={state.hourlyRate}
          hoursWorked={state.hoursWorked}

          updateHourlyRate={updateHourlyRate}
          updateHoursWorked={updateHoursWorked}
        />
      )}

      <Tabs 
        tab={state.tab} 
        onChange={(e) => {
          setTabSelected(e.target.value);
        }}
      />
    </div>
  )
}