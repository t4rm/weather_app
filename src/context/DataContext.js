import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState({ "mode": "c" });
  const [parameter, setParameter] = useState(false)

  if (parameter === false) {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      await fetch(url).then(res => res.json()).then(res => {
        setParameter(res.address.city);
      })
    }, async function (err) {
      // if permission denied
      if (err.code === 1) {
        const url2 = `https://api.ipify.org?format=json`;
        await fetch(url2).then(res => res.json()).then(res => {
          setParameter(res.ip)
        });
      }
    })
  }

  useEffect(() => {
    if (parameter === false) return;
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('http://api.weatherapi.com/v1/forecast.json?key=' + process.env.REACT_APP_KEY + '&q=' + parameter + '&days=14&aqi=yes&alerts=no');
        setData(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();

  }, [parameter]);


  return (
    <DataContext.Provider value={{ data, loading, option, setOption, setParameter }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
export default DataContext;