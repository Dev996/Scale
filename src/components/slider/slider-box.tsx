import SliderContainer from "./slider-container";
import React, {ReactElement} from "react";
import SliderRangeInputs from "./slider-range-inputs";
import SliderInput from "./slider-input";
import {useSliderContext} from "../../hooks/useSliderContext";

/**
 * Component representing a slider box with input fields based on the context provided by useSliderContext.
 * It displays either a single value input or range inputs based on the 'range' property from the context.
 */
const SliderBox = () => {

    const {range, min, max, setSliderValue, sliderValue} = useSliderContext()

    /**
     * Determines the appropriate input component based on the 'range' property from the context.
     * Returns either SliderRangeInputs for range input or SliderInput for single value input.
     * @returns {React.ReactElement} Either SliderRangeInputs or SliderInput component JSX.
     */
    const getInputValue = (): React.ReactElement => {
        return range ? <SliderRangeInputs/> : <SliderInput value={sliderValue} callBack={(input: string) => {
            if (parseInt(input) >= min && parseInt(input) <= max) {
                setSliderValue(parseInt(input));
            }
        }}/>
    }

    return (
        <>
            <div className={"slider-box"}>
                <SliderContainer/>
                {getInputValue()}
            </div>
        </>
    )

}

export default SliderBox