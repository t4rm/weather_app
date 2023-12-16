import React from "react";
import Main from "../components/main/Main";
import ChartGrid from "../components/secondary/ChartGrid";
import ForecastGrid from "../components/tertiary/ForecastGrid";
class Home extends React.Component {
    render() {
        return (
            <div className="app-container">
                <div className="app">
                    <div className="container fill">
                        <Main/>
                        <ChartGrid/>
                        <ForecastGrid/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home