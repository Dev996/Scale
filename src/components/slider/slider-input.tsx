import React from "react";
import {useSliderContext} from "../../hooks/useSliderContext";
import {SliderInputProps} from "../../types/slider-types";

/**
 * Component representing an input field for a single slider thumb.
 * Users can input a numeric value to set the slider thumb position.
 * @param {SliderInputProps} props - SliderInput component props.
 */
const SliderInput: React.FC<SliderInputProps> = (props: SliderInputProps) => {

    const {min, max} = useSliderContext();

    return (
        <>
            <div className={"slider-input-1"}>
                <input type={"number"} max={max.toString()} min={min.toString()} className={"form-control"}
                       value={parseInt(props.value.toString())}
                       onChange={(e) => props.callBack(e.target.value)}/>
            </div>
        </>
    )

}

export default SliderInput