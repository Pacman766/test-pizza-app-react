import React, { useState } from 'react';

import './app.scss';

function App() {
  const [error, setError] = useState(undefined);

  const fetchGuests = async () => {
    try {
      const response = await fetch(
        'https://gp-js-test.herokuapp.com/pizza/guests'
      );
      // console.log(response);
      const data = await response.json();
      // console.log(data.party);
      return data.party;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const fetchDiets = async (people) => {
    const encoded = people.map(({ name }) => encodeURIComponent(name));

    try {
      const response = await fetch(
        `https://gp-js-test.herokuapp.com/pizza/world-diets-book/${encoded}`
      );

      const data = await response.json();
      console.log(data.diet);
      return data.diet;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const people = [
    { name: 'Anton Chehov', isVegan: true },
    { name: 'Vladimir Pushkin', isVegan: false },
  ];
  fetchDiets(people);

  return <div className="App"></div>;
}

export default App;
