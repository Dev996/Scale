import React, {useEffect, useMemo, useRef} from "react";
import {useSliderContext} from "../../hooks/useSliderContext";
import {SliderRangeThumbProps} from "../../types/slider-types";
import tippy from "tippy.js";
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';

/**
 * Component representing the thumbs of a slider in range selection mode.
 * Allows users to drag and adjust the values of the slider thumbs.
 * @param {SliderRangeThumbProps} props - SliderRangeThumb component props.
 */
const SlideRangeThumb: React.FC<SliderRangeThumbProps> = (props: SliderRangeThumbProps) => {

    const {min, max, sliderValues, setSliderValues} = useSliderContext();

    /**
     * References to the thumb elements.
     * These references are used to interact with the thumb elements in the component.
     */
    const thumbs1Ref = useRef<HTMLDivElement>(null);
    const thumbs2Ref = useRef<HTMLDivElement>(null);

    // Event listeners for thumb dragging
    const mousemoveListener1 = (e: MouseEvent): void => handleDrag(e, 0);
    const mousemoveListener2 = (e: MouseEvent): void => handleDrag(e, 1);

    /**
     * Handles the mouse down event on the thumb elements.
     * Initiates thumb dragging behavior based on the clicked thumb.
     * @param {React.MouseEvent<HTMLDivElement>} event - Mouse down event.
     */
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        if (props.verifyThumb(event.clientX)) {
            handleDrag(event, 0);
            thumbs1Ref.current?.addEventListener('mousemove', mousemoveListener1);
        } else {
            handleDrag(event, 1);
            thumbs2Ref.current?.addEventListener('mousemove', mousemoveListener2);
        }
    };

    // Execute tooltip for the specified slider thumb with its corresponding value
    const executeTooltip = (id: 0 | 1) => {
        tippy('#st-' + id, {
            animation: 'scale',
            content: parseInt(sliderValues[id].toString()).toString(),
        })
    }

    // Run the executeTooltip function for both thumbs whenever sliderValues change
    useEffect(() => {
        executeTooltip(0)
        executeTooltip(1)
    }, [sliderValues]);

    /**
     * Handles thumb dragging based on the mouse position.
     * Calculates the new thumb value and updates the slider values.
     * @param {React.MouseEvent<HTMLDivElement> | MouseEvent} event - Mouse event.
     * @param {0 | 1} thumbIndex - Index of the dragged thumb (0 or 1).
     */
    const handleDrag = useMemo(() => {
        return (event: React.MouseEvent<HTMLDivElement> | MouseEvent, thumbIndex: 0 | 1) => {
            const newValues: [number, number] = [...sliderValues];
            newValues[thumbIndex] = props.calculateValue(event.clientX);
            setSliderValues([...newValues]);
        };
    }, [sliderValues, props, setSliderValues]);

    return (
        <>
            {/* First thumb element */}
            <div className="slider-thumb" id={"st-0"}
                 style={{left: `${((sliderValues[0] - min) / (max - min)) * 100}%`}}
                 ref={thumbs1Ref}
                 onMouseDown={(event) => {
                     handleMouseDown(event);
                 }}
                 onMouseUp={() => {
                     thumbs1Ref.current?.removeEventListener('mousemove', mousemoveListener1);
                 }}
            />
            {/* Second thumb element */}
            <div className="slider-thumb" id={"st-1"}
                 style={{left: `${((sliderValues[1] - min) / (max - min)) * 100}%`}}
                 ref={thumbs2Ref}
                 onMouseDown={(event) => {
                     handleMouseDown(event);
                 }}
                 onMouseUp={() => {
                     thumbs2Ref.current?.removeEventListener('mousemove', mousemoveListener2);
                 }}
            />
        </>
    );
};

export default SlideRangeThumb;
