import SliderTrack from "./slider-track";
import React, {useMemo, useRef} from "react";
import {useSliderContext} from "../../hooks/useSliderContext";

/**
 * Component representing the container of the slider track.
 * Handles mouse events for dragging and updating slider values based on user interactions.
 */
const SliderContainer = () => {

    /**
     * Reference to the slider container element.
     * This reference is used to interact with the slider container in the component.
     */
    const sliderRef = useRef<HTMLDivElement>(null);

    const {setSliderValue, min, max, range, sliderValues} = useSliderContext();

    /**
     * Handles the mouse down event on the slider container.
     * Initiates slider dragging behavior and adds a mousemove event listener for continuous dragging.
     * @param {React.MouseEvent<HTMLDivElement>} event - Mouse down event.
     */
    const handleSlider = (event: React.MouseEvent<HTMLDivElement>) => {
        // Call handleDrag to calculate initial slider value
        handleDrag(event);
        // Add a mousemove event listener to handle continuous dragging
        sliderRef.current?.addEventListener('mousemove', handleDrag as unknown as EventListener);
    };

    /**
     * Handles the mouse move event for slider dragging.
     * Calculates the new slider value based on the mouse position and updates the slider state.
     * @param {React.MouseEvent<HTMLDivElement> | MouseEvent} event - Mouse move event.
     */
    const handleDrag = (event: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
        // Calculate the new slider value based on the mouse position
        const newValue = calculateValue(event.clientX);
        // Update the slider value using setSliderValue function from the context
        setSliderValue(newValue);
    };


    /**
     * Calculates the slider value based on the mouse position within the slider container.
     * @param {number} positionX - X-coordinate of the mouse position.
     * @returns {number} Calculated slider value within the specified range.
     */
    const calculateValue = (positionX: number): number => {
        // Get the position and dimensions of the slider container
        const rect = sliderRef.current!.getBoundingClientRect();
        // Calculate the percentage of the mouse position relative to the slider container's width
        const percentage = (positionX - rect.left) / rect.width;
        // Calculate the value based on the percentage within the specified range
        const calculatedValue = min + percentage * (max - min);
        // Ensure the calculated value is within the range [min, max]
        return Math.min(max, Math.max(min, calculatedValue));
    };


    /**
     * Memoized function to check if the first thumb is closer to a specified mouse position than the second thumb.
     * @param {number} clientX - X-coordinate of the mouse position.
     * @returns {boolean} True if the first thumb is closer, false otherwise.
     */
    const checkFirstThumbMoved = useMemo(() => {
        // The returned function checks if the first thumb is closer to the mouse position than the second thumb.
        return (clientX: number) => {
            // Check if sliderRef.current exists (slider container reference is available)
            if (sliderRef.current) {
                // Get the slider container's position and dimensions
                const rect = sliderRef.current.getBoundingClientRect();
                // Calculate the click position relative to the slider container
                const clickPosition = clientX - rect.left;
                // Calculate distances of both thumbs from the click position
                const thumb1Distance = Math.abs(clickPosition - ((sliderValues[0] - min) / (max - min)) * rect.width);
                const thumb2Distance = Math.abs(clickPosition - ((sliderValues[1] - min) / (max - min)) * rect.width);
                // Return true if the first thumb is closer, false otherwise
                return thumb1Distance < thumb2Distance;
            }
            // Return false if sliderRef.current is not available (fallback case)
            return false;
        };
    }, [sliderValues, min, max]);


    return (
        <>
            <div
                className="slider-container"
                ref={sliderRef}
                onMouseDown={(event) => {
                    if (!range) handleSlider(event);
                }}
                onMouseUp={() => {
                    if (!range) document.removeEventListener('mousemove', handleDrag as unknown as EventListener);
                }}
            >
                <SliderTrack calculateValue={calculateValue} checkFirstThumbMoved={checkFirstThumbMoved}/>
            </div>
        </>
    )

}

export default SliderContainer