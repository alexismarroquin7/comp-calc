import { products } from "@/data/products";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { formatNumberWithCommas } from "@/utils";
import { Share } from "@mui/icons-material";
import { compDocument } from "@/utils/compDocument";

export const Payout = ({ productsSold, hourlyRate, hoursWorked }) => {
  const [sum, setSum] = useState(0);
  const [productsSoldCount, setProductsSoldCount] = useState(0);
  const [tier, setTier] = useState(0);
  const [hours, setHours] = useState({hoursWorked: 0, hourlyRate: 0});

  useEffect(() => {
    
    setSum(Object.keys(productsSold)
    .reduce((acc, curr) => {
      const [p] = products.filter(p => p.name === curr);
      p && setProductsSoldCount(c => c += Number(productsSold[curr]));
      return p ? acc += (Number(productsSold[curr]) * p.amount) : acc;
    }, 0))

  }, [productsSold]);

  useEffect(() => {

    if (sum < 1750) { 
      setTier(7);
    } else if (sum < 3000) {
      setTier(15);
    } else {
      setTier(25);
    }
    
  }, [sum]);

  useEffect(() => {
    setHours(h => {
      return {
        ...h,
        hoursWorked,
        hourlyRate
      }
    })    
  
  }, [hourlyRate, hoursWorked])
  

  return <div
    className={styles.root}
  >
    <h2>Payout</h2>
    
    <button
      className={styles.export_button}
      onClick={() => {
        compDocument({
          productsSold,
          hoursWorked,
          hourlyRate
        });
      }}
    >
      <Share fontSize="inherit"/>
      Export
    </button>
    
    
    <div
      className={styles.card}
    >
      <p
        className={styles.card_name}
      >Products Sold</p>
      <h3
        className={styles.number}
      >
        {productsSoldCount}
      </h3>
    </div>
    <div
      className={styles.card}
    >
      <p
        className={styles.card_name}
      >Tier</p>
      <h3
        className={styles.number}
      >
        {tier}%
      </h3>
    </div>
    
    
    
    <div
      className={styles.card}
    >
      <p
        className={styles.card_name}
      >Total Contribution</p>
      <h3
        className={styles.number}
      >${formatNumberWithCommas(Number(sum))}</h3>
    </div>
    
    <div
      className={styles.card}
    >
      <p
        className={styles.card_name}
      >Contribution Gross Income</p>
      <h3
        className={styles.number}
      >${formatNumberWithCommas(Number(sum * Number(tier / 100)))}</h3>
    </div>
    
    <div
      className={styles.card}
    >
      <p
        className={styles.card_name}
      >Pay Period Gross Income</p>
      <h3
        className={styles.number}
      >${formatNumberWithCommas(Number(hours.hourlyRate*hours.hoursWorked))}</h3>
    </div>
    
    <div
      className={styles.card}
    >
      <p
        className={styles.card_name}
      >Pay Period + Contribution Gross Income</p>
      <h3
        className={styles.number}
      >${formatNumberWithCommas(Number(Number(hours.hourlyRate*hours.hoursWorked) + Number(sum * Number(tier / 100))))}</h3>
    </div>
    
    <div
      className={styles.card}
    >
      <p
        className={styles.card_name}
      >Effective Hourly Rate</p>
      <h3
        className={styles.number}
      >$
        {formatNumberWithCommas(hours.hourlyRate === 0 ? 0 : Number(Number(Number(hours.hourlyRate * hours.hoursWorked) + Number(sum * Number(tier/100))) / hours.hoursWorked))}
      </h3>
    </div>

  </div>
}