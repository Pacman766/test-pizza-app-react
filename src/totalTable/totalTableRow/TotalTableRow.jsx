import React from 'react';

const TotalTableRow = (name, amount) => {
  return (
    <tr>
      <td className="final-sums">{name}</td>
      <td colSpan={2} className="final-sums">
        {amount}BYN
      </td>
    </tr>
  );
};

export default TotalTableRow;
