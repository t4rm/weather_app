import React from 'react';
import Main from "../components/main/Main";
import ChartGrid from "../components/secondary/ChartGrid";
import ForecastGrid from "../components/tertiary/ForecastGrid";
import Loading from '../components/Loading';
import { useDataContext } from '../context/DataContext';

const Home = () => {
    const { loading } = useDataContext();

    return (
        <div className="app-container">
            <div className="app">
                    {loading ? <Loading /> : <div className="container fill" style={loading ? {opacity: 0} : {}}><Main /> <ChartGrid /> <ForecastGrid /></div>}
            </div>
        </div>
    );
};

export default Home