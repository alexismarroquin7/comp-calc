export const  formatNumberWithCommas = (number) => {
  if(Number.isNaN(number)){
    throw Error(`unexpected: number is NAN`)
  }
  // Round the number to two decimal places and add a decimal if needed
  const roundedNumber = parseFloat(number.toFixed(2));

  // Convert the number to a string
  let numberString = roundedNumber.toString();

  // Check if the decimal part has only one digit and if so, append '0' to it
  if (numberString.includes('.') && numberString.split('.')[1].length === 1) {
    numberString += '0';
  }

  // Separate the whole number part from the decimal part
  const parts = numberString.split('.');
  const wholeNumber = parts[0];
  const decimal = parts[1];

  // Add commas for thousands and millions places (and more if needed)
  numberString = wholeNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Add the decimal and two decimal places back if it exists
  numberString += '.' + (decimal || '00');

  return numberString;
}