import { useEffect, useState } from "react";
import styles from "./index.module.css";

export const Tabs = ({ tab, onChange }) => {
  const [tabList, setTabList] = useState([]);
  const [tabSelected, setTabSelected] = useState("");

  useEffect(() => {
    setTabList(tab.list);
  }, [tab.list]);
  
  useEffect(() => {
    setTabSelected(tab.selected);
  }, [tab.selected]);
  
  return (
    <div
      className={styles.root}
    >
      <div
        className={styles.tab_list}
      >
        {tabList.map(tabItem => {
          return <label
            key={tabItem.id}
            className={`${styles.label} ${tabItem.name === tabSelected ? styles.label_active : ""}`}
          >
            {tabItem.name.replace('-',' ')}
            <input 
              type="radio"
              className={styles.input}
              value={tabItem.name}
              checked={tabItem.name === tabSelected}
              onChange={onChange}
            />
            </label>
        })}
      </div>
    </div>
  )
}