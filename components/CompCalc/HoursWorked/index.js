
import { useEffect, useState } from "react";
import { useToggle } from "@/hooks";

import { formatNumberWithCommas } from "@/utils";

import styles from "./index.module.css";

const initialFormValues = {
  hoursWorked: 0,
  hourlyRate: 0
}

export const HoursWorked = ({ hoursWorked, hourlyRate, update }) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [editing, toggleEditing] = useToggle(false);

  useEffect(() => {
    setFormValues(f => {
      return {
        ...f,
        hoursWorked,
        hourlyRate
      }
    })
  }, [hoursWorked, hourlyRate, setFormValues])

  const handleChange = (e) => {
    const {name,value} = e.target;

    setFormValues({
      ...formValues,
      [name]: value
    })

  }

  const handleSubmit = e => {
    e.preventDefault();
    update(formValues);
    toggleEditing();
  }

  return (
    <div
      className={styles.root}
    >
      <h2>Hours Worked</h2>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <div
          className={styles.top_row}
        >
          <button
            className={editing ? styles.edit_button_outline : styles.edit_button}
            onClick={toggleEditing}
            type="button"
          >
            {editing ? "Cancel" : "Edit"}
          </button>
          
          {editing && (
            <button
              type="button"
              className={styles.edit_button_outline}
            >Reset
            </button>
          )}
          
          {editing && (
            <button
              type="Submit"
              className={styles.edit_button}
            >Save
            </button>
          )}

          
        </div>
      
        <div
          className={styles.form_container}
        >
          <div
            className={styles.form_card}
          >
            <label
              className={styles.label}
            >
              Hours Worked
              {editing ? <input
                className={styles.input}
                type="number"
                name="hoursWorked"
                value={formValues.hoursWorked}
                onChange={handleChange}

              /> : (
                <p
                  className={styles.number_text}
                >{formValues.hoursWorked}</p>
              )}
            </label>
          </div>
          
          <div
            className={styles.form_card}
          >
            <label
              className={styles.label}
            >
              Hourly Rate
              {editing ? <input
                className={styles.input}
                type="number"
                name="hourlyRate"
                value={formValues.hourlyRate}
                onChange={handleChange}
              /> : (
                <p
                  className={styles.number_text}
                >${formatNumberWithCommas(Number(formValues.hourlyRate))}</p>
              )}
            </label>
          </div>
        </div>
        
      </form>

    </div>
  )
}