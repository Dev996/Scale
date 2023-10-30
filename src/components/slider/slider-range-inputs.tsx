import SliderInput from "./slider-input";
import React, {useMemo} from "react";
import {useSliderContext} from "../../hooks/useSliderContext";

const SliderRangeInputs = () => {

    const {min, max, sliderValues, setSliderValues} = useSliderContext();

    const handleCallbackForMin = useMemo(() => {
        return (input: string) => {
            if (parseInt(input) >= min && parseInt(input) <= sliderValues[1]) {
                setSliderValues([parseInt(input), sliderValues[1]]);
            }
        };
    }, [min, sliderValues, setSliderValues]);

    const handleCallbackForMax = useMemo(() => {
        return (input: string) => {
            if (parseInt(input) >= sliderValues[0] && parseInt(input) <= max) {
                setSliderValues([sliderValues[0], parseInt(input)]);
            }
        };
    }, [sliderValues, max, setSliderValues]);


    return (
        <>
            <div className={"d-flex"}>
                <SliderInput value={sliderValues[0]} callBack={handleCallbackForMin}/>
                <SliderInput value={sliderValues[1]} callBack={handleCallbackForMax}/>
            </div>
        </>
    )

}
export default SliderRangeInputs