import React from 'react';
import './mainButton.scss';

const MainButton = (onClick, isLoading = false) => {
  return (
    <>
      <button onClick={onClick} disabled={isLoading}>
        Click to Load!
      </button>
      <p></p>
    </>
  );
};

export default MainButton;
