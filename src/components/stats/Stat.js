import React from 'react';
import AQIStats from "./AQIStats";

const Stat = (props) => {
    return (
        <React.Fragment key={props.id}>
            <span>{props.name}</span>
            <span className={"dot" + (props.name === "Air Quality" ? " aqi" : "")} >
                {props.id === "precipitation" ?
                    <svg className="visible" fill="#9AE0FD" height="20" width="20" viewBox="0 0 300 300" preserveAspectRatio="none">
                        <g transform="translate(40)">
                            <path d="M 243.44676,222.01677 C 243.44676,288.9638 189.17548,343.23508 122.22845,343.23508 C 55.281426,343.23508 1.0101458,288.9638 1.0101458,222.01677 C 1.0101458,155.06975 40.150976,142.95572 122.22845,0.79337431 C 203.60619,141.74374 243.44676,155.06975 243.44676,222.01677 z"></path>
                        </g>
                    </svg>
                    :
                    <svg height="20" width="20" style={{ display: "block" }}>
                        <circle cx="10" cy="10" r="7" fill={props.color}></circle>
                    </svg>
                } {props.data} {props.unit}
                {props.name === "Air Quality" ? <AQIStats /> : ""}
            </span>
        </React.Fragment>
    );
};

export default Stat;
