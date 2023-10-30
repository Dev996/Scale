import React, {useEffect, useState} from 'react';
import './slider.css';
import {SliderRangeProps} from "../../types/slider-types";
import SliderBox from "./slider-box";
import {SliderContext} from '../context/slider-context';

const defaultProps = {
    min: 0,
    max: 100,
    value: 0,
    values: [0, 100],
    range: false,
}

/**
 * Component representing a slider with a single thumb or a range of thumbs.
 * Manages the slider value(s) state and provides them to the SliderContext.
 * @param {SliderRangeProps} props - SliderRange component props.
 */
const SliderRange: React.FC<SliderRangeProps> = (props: SliderRangeProps) => {
    // State variables for slider value(s)
    const [sliderValue, setSliderValue] = useState<number>(props.min);
    const [sliderValues, setSliderValues] = useState<[number, number]>([props.min, props.max]);
    // Context value to provide to SliderContext
    const contextValue = {
        min: props.min,
        max: props.max,
        range: props.range,
        sliderValue,
        sliderValues,
        setSliderValue,
        setSliderValues
    }

    /**
     * useEffect hook to trigger the onChange callback when slider values change.
     * Calls the onChange callback with the value(s) based on the range property.
     * @param {Function | undefined} props.onChange - Callback function to be triggered when slider values change.
     * @param {boolean} props.range - A boolean indicating whether the slider is in range selection mode.
     * @param {number} sliderValue - Current single slider value.
     * @param {[number, number]} sliderValues - Current range of slider values.
     */
    useEffect(() => {
        props.onChange && props.onChange(props.range ? sliderValues : sliderValue)
    }, [sliderValues, sliderValue]);

    return (
        <SliderContext.Provider
            value={contextValue}>
            <SliderBox/>
        </SliderContext.Provider>
    );
};

SliderRange.defaultProps = defaultProps;

export default SliderRange;
