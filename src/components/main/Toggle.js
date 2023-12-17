import React, { useState } from 'react';
import { useDataContext } from '../../context/DataContext';

const Toggle = () => {
    const { loading, option, setOption, setParameter  } = useDataContext();
    const [toggle, setToggle] = useState(true);
    if (loading) return;


    const handleToggle = () => {
        setToggle(!toggle);
    };

    const handleOptionMode = (val) => {
        setOption({...option, mode: val.target.value});
    }

    function handleForm(val) {
        val.preventDefault();
        setParameter(val.target[0].value);
    }
    
    return (
        <div id="select-btn" className={"select-btn" + (toggle ? " open" : "")} >
            <span id="arrow-dwn" className="arrow-dwn prevent-select" onClick={handleToggle}>▼</span>
            <form className="subnav-content" onSubmit={handleForm}>
                <input type="text" name='query' placeholder="Enter an IP Address, City, Country, ZIP Code (UK & US Only)" size={48}/>
                <div className="mode-select" onChange={handleOptionMode}>
                    <input type="radio" name="mode" value={"c"} />
                    <input type="radio" name="mode" value={"f"} />
                </div>
            </form>
        </div>
    );
};

export default Toggle;
