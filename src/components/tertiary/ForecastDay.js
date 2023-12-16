const ForecastDay = (props) => {
    const operatorTemperatureMax = (props.max > 0 ? "+" : "")
    const operatorTemperatureMin = (props.min > 0 ? "+" : "")
    const date = new Date(props.date);

    return (
        <div className={'th' + props.id + ' small-glass'} style={{textAlign: "center"}}>
            <div className='flex-center'>
                <span>{date.toLocaleDateString('en-us', { weekday: "short" })}</span>
                <span className='forecast-month'>{date.toLocaleDateString('en-us', { day: "numeric", month: "short" })}</span>
            </div>
            <div className='flex-col'>
                <div className='flex-row'>
                    <div className='flex-col'>
                        <div className='forecast-caption forecast-header'>
                            <span>{operatorTemperatureMax + parseInt(props.max)}</span>
                        </div>
                    </div>
                    <div className='flex-col'>
                        <img src={"assets/images/weather/" + props.icon} alt='Icon corresponding to the forecast weather' height='50px' />
                    </div>
                </div>
                <div className="flex-row">
                    <div className="flex-col">
                        <div className="forecast-night">
                            <img src="assets/images/weather/clear-night.svg" height='30px' style={{ filter: "grayscale(100%)" }} alt="Icon corresponding to the moon" />
                            <span>{operatorTemperatureMin + parseInt(props.min)}</span>
                        </div>
                    </div>
                    <div className="flex-col">
                        <div className="forecast-caption forecast-detail">
                            {props.info}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForecastDay;