import React, { useEffect, useState } from 'react';
import Header from './header/Header';
import MainButton from './mainButton/MainButton';

import './app.scss';

function App() {
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [onceLoaded, setOnceLoaded] = useState(false);
  const [allPeople, setAllPeople] = useState(0);
  const [diet, setDiet] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [currencyExchageRates, setCurrencyExchageRates] = useState({});

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

  const fetchPizzaOrder = async (pizzaType, sliceCount) => {
    try {
      const response = await fetch(
        `https://gp-js-test.herokuapp.com/pizza/order/${pizzaType}${sliceCount}`
      );
      return await response.json();
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const fetchCurrency = async () => {
    try {
      const response = await fetch(
        `https://gp-js-test.herokuapp.com/pizza/currency`
      );
      return await response.json();
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const handleClick = async () => {
    try {
      setIsLoading(true);

      const guests = await fetchGuests();
      setAllPeople(guests);
      const pizzaEater = guests.filter((guest) => guest.eatsPizza);

      const diets = await fetchDiets(pizzaEater);
      setDiet(diets.map((diet) => ({ ...diet, hasPaid: false })));
      const vegans = diets.filter((diet) => diet.isVegan);

      let pizzaType = '';

      if (vegans / pizzaEater >= 0.51) {
        const pizzaWothoutMeat = ['cheese', 'vegan'];
        pizzaType =
          pizzaWothoutMeat[Math.floor(Math.random() * pizzaWothoutMeat.length)];
      } else {
        pizzaType = 'meat';
      }

      const [orderdetails, currencyExchangeRates] = await Promise.all([
        fetchPizzaOrder(pizzaType, pizzaEater.length),
        fetchCurrency(),
      ]);
      setCurrencyExchageRates(currencyExchageRates);
      setOrderDetails(orderDetails);
      if (!onceLoaded) {
        setOnceLoaded(true);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayClick = (name) => {
    setDiet((diets) => {
      const dietsCopy = [...diets];
      const index = dietsCopy.findIndex((diet) => diet.name === name);
      dietsCopy[index].hasPaid = true;
      return dietsCopy;
    });
  };

  return (
    <div className="App">
      <Header />
      <MainButton />
    </div>
  );
}

export default App;
