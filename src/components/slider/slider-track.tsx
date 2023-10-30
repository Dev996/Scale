import React, {useEffect} from "react";
import SlideRangeThumb from "./slide-range-thumb";
import {useSliderContext} from "../../hooks/useSliderContext";
import {SliderTrackProps} from "../../types/slider-types";
import tippy from "tippy.js";

/**
 * Component representing the track of the slider, including thumbs and fill between thumbs.
 * @param {SliderTrackProps} props - SliderTrack component props.
 */
const SliderTrack: React.FC<SliderTrackProps> = (props: SliderTrackProps) => {

    const {sliderValue, sliderValues, min, max, range} = useSliderContext();

    /**
     * Determines the thumbs to render based on the 'range' property.
     * @returns {React.ReactElement} SlideRangeThumb or single slider thumb component.
     */
    const getThumbs = (): React.ReactElement => {
        if (range) {
            return <SlideRangeThumb
                calculateValue={props.calculateValue}
                verifyThumb={props.checkFirstThumbMoved}/>;
        } else {
            // Render a single slider thumb with appropriate left position
            return <div className="slider-thumb" id={"st"}
                        style={{left: sliderValue !== min ? `${((sliderValue - min) / (max - min)) * 100}%` : '0%'}}/>;
        }
    };

    const executeTooltip = () => {
        tippy('#st', {
            duration: 0,
            animation: 'scale',
            content: parseInt(sliderValue.toString()).toString(),
        })
    }

    // Run the executeTooltip function for both thumbs whenever sliderValues change
    useEffect(() => {
        executeTooltip()
    }, [sliderValue]);

    return (
        <>
            <div className="slider-track">
                <div
                    className="slider-fill"
                    style={{
                        left: range ? `${((sliderValues[0] - min) / (max - min)) * 100}%` : 0,
                        width: range ? `${((sliderValues[1] - sliderValues[0]) / (max - min)) * 100}%` :
                            `${((sliderValue - min) / (max - min)) * 100}%`,
                    }}
                />
                {getThumbs()}
            </div>
        </>
    );
};

export default SliderTrack;