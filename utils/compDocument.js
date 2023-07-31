import { products } from "@/data/products";
import { formatNumberWithCommas } from ".";

const getTier = (sum) => {
  if (sum < 1750) { 
    return 7;
  } else if (sum < 3000) {
    return 15;
  } else {
    return 25;
  }
}

export const compDocument = ({productsSold, hoursWorked, hourlyRate}) => {
  let productsTable = `<table>`;  
  productsTable += `<thead>`;  
  productsTable += `
    <tr>
      <td colspan="4">Products</td>
    </tr>
  `;
  productsTable += `
  <tr>
    <td>Name</td>
    <td>Value</td>
    <td>Quantity Sold</td>
    <td>Gross Earned</td>  
  </tr>
  `;
  productsTable += `</thead>`;
  productsTable += `<tbody>`;

  let quantityProductsSold = 0;
  let grossContribution = 0;

  Object.keys(productsSold).forEach((productSoldKey, i) => {
    
    const [p] = products.filter(prod => prod.name === productSoldKey);
    
    grossContribution += Number(p.amount * productsSold[productSoldKey]);
    quantityProductsSold += Number(productsSold[productSoldKey]);
    
    productsTable += `
      <tr>
      <td>${p.label}</td>
      <td>$${formatNumberWithCommas(Number(p.amount))}</td>
      <td>${productsSold[productSoldKey]}</td>
      <td>$${formatNumberWithCommas(Number(p.amount * productsSold[productSoldKey]))}</td>
      </tr>
      `
        
  });
      
  productsTable += `<tr>
    <td colspan="2">Totals</td>
    <td>${quantityProductsSold}</td>
    <td>$${formatNumberWithCommas(Number(grossContribution))}</td>
  </tr>`;  
  productsTable += `</tbody>`;
  
  productsTable += `</table>`;  
  
  let totalsTable = `<table>`;
  
  totalsTable += `<thead>`;
  totalsTable += `
    <tr>
      <td colspan="9">Totals</td>
    </tr>
  `;

  
  totalsTable += `
    <tr>
      <td>Products Sold</td>
      <td>Tier</td>
      <td>Total Contribution</td>
      <td>Contribution Gross Income</td>
      <td>Hourly Rate</td>
      <td>Hours Worked</td>
      <td>Pay Period Gross Income</td>
      <td>Pay Period + Contribution Gross Income</td>
      <td>Effective Hourly Rate</td>

    </tr>
  `;
  totalsTable += `</thead>`;
  totalsTable += `<tbody>`;
  
  totalsTable += `
    <tr>
      
      <td>${quantityProductsSold}</td>
      <td>${getTier(grossContribution)}%</td>
      <td>$${formatNumberWithCommas(Number(grossContribution))}</td>
      <td>$${formatNumberWithCommas(Number(grossContribution * Number(getTier(grossContribution) / 100)))}</td>
      <td>$${formatNumberWithCommas(Number(hourlyRate))}</td>
      <td>${hoursWorked}</td>
      <td>$${formatNumberWithCommas(Number(hourlyRate * hoursWorked))}</td>
      <td>$${formatNumberWithCommas(Number(Number(hourlyRate * hoursWorked) + Number(grossContribution * Number(getTier(grossContribution) / 100))))}</td>
      <td>$${formatNumberWithCommas(Number(Number(Number(hourlyRate * hoursWorked) + Number(grossContribution * Number(getTier(grossContribution) / 100))) / Number(hoursWorked)))}</td>

    </tr>
  `;

  totalsTable += `</tbody>`;

  totalsTable += `</table>`;
      
  const data = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
  
  ${totalsTable}
  ${productsTable}

  </body>
  <style>

    * {
      font-family: 'Roboto', sans-serif;
      font-size: 62.5%;
      
    }

    table {
      border: 2px solid black;
      border-collapse: collapse;
      width: 100%;
    }

    th,
    td {
      border: 2px solid black;
      padding: 8px;
      text-align: center;
    }

    thead {
      background-color: #f2f2f2;
      font-weight: bold;
    }

    tbody tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    th,
    td {
      font-size: 18px;
    }

  </style>
  </html>

  `;

  const blob = new Blob([data], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;

  const filename = `comp_calc.html`;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  return;
}