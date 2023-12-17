import React from 'react';
import { useDataContext } from '../../context/DataContext';

const Menu = () => {
  const { data, loading, option } = useDataContext();
  if (loading) return;


  return (
    <nav>

    </nav>
    );
};

export default Menu;
