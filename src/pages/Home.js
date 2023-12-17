import React from 'react';
import Main from "../components/main/Main";
import ChartGrid from "../components/secondary/ChartGrid";
import ForecastGrid from "../components/tertiary/ForecastGrid";
import Loading from '../components/Loading';
import { useDataContext } from '../context/DataContext';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Home = () => {
    const { loading } = useDataContext();

    useGSAP(() => {
        var tl = new gsap.timeline({repeat: -1});
        tl.fromTo(".loader", { opacity: 1, duration: 0.5 }, { opacity: 0, duration: 1 })
        tl.fromTo(".loader", { opacity: 0, duration: 0.5 }, { opacity: 1, duration: 1 })
    })

    return (
        <div className="app-container">
            <div className="app">
                    {loading ? <Loading /> : <div className="container fill"><Main /> <ChartGrid /> <ForecastGrid /></div>}
            </div>
        </div>
    );
};

export default Home