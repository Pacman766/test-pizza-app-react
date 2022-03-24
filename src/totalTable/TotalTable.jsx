import React from 'react';
import TotalTableRow from './totalTableRow/TotalTableRow';
import { splitPrice, roundNumber, convertToBYN } from '../utils';

const TotalTable = ({
  pizzaEaters,
  orderDetails,
  currencyExchengeRates,
  onPayClick,
  diets,
}) => {
  const { amount, currency } = splitPrice(orderDetails.price);
  const BYNprice = roundNumber(
    convertToBYN(currency, amount, currencyExchengeRates)
  );
  const sumPerPerson = roundNumber(BYNprice / pizzaEaters.length);

  return (
    <table>
      <thead>
        <tr>
          <th className="col1">Name</th>
          <th className="col2">Share to pay</th>
          <th className="col3">Pay</th>
        </tr>
      </thead>
      <tbody>
        {pizzaEaters.map(({ isVegan, name, hasPaid }) => (
          <tr key={name}>
            <td className={isVegan ? 'vegan' : ''}>{name}</td>
            <td>{hasPaid ? 0 : sumPerPerson} BYN</td>
            <td>
              <button
                className="btn-pay"
                disabled={hasPaid}
                onClick={() => onPayClick(name)}
              >
                {hasPaid ? 'Paid' : 'Pay'}
              </button>
            </td>
          </tr>
        ))}
        <TotalTableRow
          name={'Total order'}
          amount={roundNumber(sumPerPerson * pizzaEaters.length)}
        />
        <TotalTableRow
          name={'Money to collect'}
          amount={roundNumber(
            sumPerPerson * diets.filter((diet) => !diet.hasPaid).length
          )}
        />
        <TotalTableRow
          name={'Money collected'}
          amount={roundNumber(
            sumPerPerson * diets.filter((diet) => diet.hasPaid).length
          )}
        />
      </tbody>
    </table>
  );
};

export default TotalTable;
