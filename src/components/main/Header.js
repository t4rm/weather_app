import React from 'react';
import { useDataContext } from '../../context/DataContext';

const Header = () => {
  const { data, loading } = useDataContext();
  if (loading) return;

  const locationData = data.location;
  const currentDay = new Date();

  return (
    <header>
      <span>{locationData.name}, {locationData.country}</span>
      <span>Today, {currentDay.toLocaleDateString('en-us', {month:"short", day:"numeric"})}</span>
    </header>
  );
};

export default Header;
