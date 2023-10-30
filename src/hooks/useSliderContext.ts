import {useContext} from "react";
import {SliderContextType} from "../types/slider-types";
import {SliderContext} from "../components/context/slider-context";

/**
 * Custom hook to access the SliderContext, providing access to slider-related data and actions.
 * @returns {SliderContextType} The context containing slider state and functions.
 * @throws {Error} Throws an error if used outside the SliderProvider context.
 */
export const useSliderContext = (): SliderContextType => {
    const context = useContext(SliderContext);
    if (context === undefined) {
        throw new Error('useSliderContext must be used within a SliderProvider');
    }
    return context;
};