import React from 'react';
import './App.css';
import SliderRange from "../components/slider/slider-Range";

function App() {

    return (
        <>
            <h2 className={"App-header"}>React Test Task</h2>
            <div className={"form"}>
                <div className={"form-group"}>
                    <label className={"form-label"} htmlFor={"name"}>Name</label>
                    <input type={"text"} placeholder={"Your name"} id={"name"} className={"form-control"}/>
                </div>
                <div className={"form-group"}>
                    <label className={"form-label"} htmlFor={"age"}>Age</label>
                    <SliderRange min={18} max={100} range={false}/>
                </div>
                <div className={"form-group"}>
                    <label className={"form-label"} htmlFor={"name"}>Temperature</label>
                    <SliderRange min={0} max={100} range={true}/>
                </div>
            </div>
        </>
    );
}

export default App;
