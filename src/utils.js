export const splitPrice = (price) => {
  const values = price.split(' ');
  return { amount: Number(values?.[0]), currency: values?.[1] };
};

export const convertToBYN = (currency, amount, currencyExchageRates) => {
  switch (currency) {
    case 'USD': {
      return amount * currencyExchageRates.USD;
    }
    case 'EUR': {
      return amount * currencyExchageRates.EUR;
    }
    default:
      return amount;
  }
};

export const roundNumber = (number) => Math.floor(number * 10) / 10;
