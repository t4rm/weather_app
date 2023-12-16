import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [option] = useState({"mode":"c"});
  const key = process.env.REACT_APP_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {

        const { data: response } = await axios.get('http://api.weatherapi.com/v1/forecast.json?key='+key+'&q=Metz&days=14&aqi=yes&alerts=no');
        setData(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();

  }, []);

  return (
    <DataContext.Provider value={{ data, loading, option }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
