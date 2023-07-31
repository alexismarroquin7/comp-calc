
import styles from "./index.module.css";
import { useEffect, useState } from "react";

import { useToggle } from "@/hooks";
import { products } from "@/data/products";

import { formatNumberWithCommas } from "@/utils";


const initialFormValues = {
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
}

export const ProductsSold = ({productsSold, update}) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [filter, setFilter] = useState('all');
  const [editing, toggleEditing] = useToggle(false);
  
  useEffect(() => {

    setFormValues(f => {
      return {
        ...f,
        ...productsSold
      }
    })
  
  }, [productsSold, editing]);
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    switch(name) {
      case "filter":
        setFilter(value);
        break;
      default:
        setFormValues({
          ...formValues,
          [name]: value
        })
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    update(formValues);
    toggleEditing();
  }

  return <div
    className={styles.root}
  >
    <h2>Products Sold</h2>

    <div
      className={styles.filter_list}
    >
      <label
        className={`${styles.filter_list_label} ${filter === "all" ? styles.filter_list_label_active : ""}`}
      >
        All
        <input 

          className={styles.filter_list_input}
          type="radio"
          name="filter"
          value="all"
          checked={filter === "all"}
          onChange={handleChange}
        />
      </label>
      <label
        className={`${styles.filter_list_label} ${filter === "dpp" ? styles.filter_list_label_active : ""}`}
      >
        DPP
        <input 

          className={styles.filter_list_input}
          type="radio"
          name="filter"
          value="dpp"
          checked={filter === "dpp"}
          onChange={handleChange}
        />
      </label>
      <label
        className={`${styles.filter_list_label} ${filter === "frp" ? styles.filter_list_label_active : ""}`}
      >
        FRP
        <input 

          className={styles.filter_list_input}
          type="radio"
          name="filter"
          value="frp"
          checked={filter === "frp"}
          onChange={handleChange}
        />
      </label>
      <label
        className={`${styles.filter_list_label} ${filter === "optional_features" ? styles.filter_list_label_active : ""}`}
      >
        Optional Features
        <input 

          className={styles.filter_list_input}
          type="radio"
          name="filter"
          value="optional_features"
          checked={filter === "optional_features"}
          onChange={handleChange}
        />
      </label>

    </div>
    
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <button
        className={editing ? styles.edit_button_outline : styles.edit_button}
        type="button"
        onClick={toggleEditing}
      >
        {editing ? "Cancel" : "Edit"}
      </button>
      
      {editing && (
        <button
          className={styles.edit_button_outline}
          type="button"
          onClick={() => setFormValues(initialFormValues)}
        >Reset</button>
      )}
      {editing && (
        <button
          className={styles.form_submit_button}
          type="submit"
        >Save</button>
      )}

      {
        products
        .filter(p => filter === 'all' ? true : p.type === filter)
        .map(p => {
          return <div
            key={p.id}
            className={styles.product_item}
          >
            <div
              className={styles.product_item_row}
            >
              <p
                className={styles.product_item_label}
              
              >{p.label}</p>
              {editing ? (
                <input
                  className={styles.form_input}
                  type="number"
                  name={p.name}
                  value={formValues[p.name]}
                  onChange={handleChange}
                /> 
              ) : (
                <p
                  className={styles.count}
                >{formValues[p.name]}</p>
              )}
            </div>

            <div
              className={styles.product_item_row}
            >
              <p
                className={`${styles.product_item_price} ${styles.product_item_price_outline}`}
              >
                <span>
                  Value:
                </span>
                <span>
                ${formatNumberWithCommas(Number(p.amount))}
                </span>
              </p>
              <p
                className={styles.product_item_price}
              > 
                <span>
                  Earned:
                </span>
                <span>
                ${formatNumberWithCommas(Number(formValues[p.name]*p.amount))}
                </span>
              </p>              
            </div>

            
            

          </div>
        })
      }
    </form>
  </div>
}