// Main component of the weather App
import React from "react";
import Header from "./Header";
import Section from "./Section";
import Aside from "./Aside";

class Main extends React.Component {
    render() {
        return (
        <div className="main">
            <Header/>
            <Section/>
            <Aside/>
        </div>
        )
    }
}

export default Main