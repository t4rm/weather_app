import React from 'react';
import { DataProvider } from './context/DataContext';
import Home from './pages/Home';

const App = () => {
  return (
    <DataProvider>
      <Home/>
    </DataProvider>
  );
};

export default App;
