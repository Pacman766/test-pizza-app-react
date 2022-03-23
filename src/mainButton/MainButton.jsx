import React from 'react';
import './mainButton.scss';

const MainButton = (onClick, onLoading = false) => {
  return (
    <>
      <button onClick={onClick} disabled={onLoading}>
        Click to Load!
      </button>
      <p></p>
    </>
  );
};

export default MainButton;
