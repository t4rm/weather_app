import React, { useState } from 'react';
import { useDataContext } from '../../context/DataContext';
import gsap from "gsap";

const Toggle = () => {
    const { loading, option, setOption, setParameter } = useDataContext();
    const [toggle, setToggle] = useState(true);
    const [hidden, setHidden] = useState("");

    if (loading) return;
    var tl = new gsap.timeline();

    const handleToggle = () => {
        setToggle(!toggle);
        if(toggle) {
            tl.add( function(){ setHidden("") } )
            tl.fromTo(".subnav-content", { opacity: 0, duration: 0.5 }, { opacity: 1, duration: 0.5 })
        } else {
            tl.to(".subnav-content", { opacity: 0, duration: 0.5 })
            tl.add( function(){ setHidden(" hidden") } )
        }
    };

    const handleOptionMode = (val) => {
        setOption({ ...option, mode: val.target.value });
    }

    function handleForm(val) {
        val.preventDefault();
        setParameter(val.target[0].value);
    }

    return (
        <div id="select-btn" className={"select-btn" + (toggle ? " open" : "")} >
            <span id="arrow-dwn" className="arrow-dwn prevent-select" onClick={handleToggle}>▼</span>
            <form className={"subnav-content" + hidden} onSubmit={handleForm}>
                <input type="text" name='query' className='query-input' placeholder="Enter an IP Address, City, Country, ZIP Code (UK & US Only)" size={48} />
                <div className="mode-select" >
                    <label style={{ margin: "10px" }} className='prevent-select'>
                        <input type="radio" id="modeC" value={"c"} name='mode' defaultChecked={true} onChange={handleOptionMode} />
                        <span>Celsius</span>
                    </label>
                    <label style={{ margin: "10px" }} className='prevent-select'>
                        <input type="radio" id="modeF" value={"f"} name='mode' onChange={handleOptionMode} />
                        <span>Fahrenheit</span>
                    </label>
                </div>
            </form>
        </div>
    );
};

export default Toggle;
