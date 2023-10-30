import {createContext} from "react";
import {SliderContextType} from "../../types/slider-types";

/**
 * Context object for managing slider-related data and functions.
 * Provides SliderContextType or undefined if accessed outside SliderProvider.
 */
export const SliderContext = createContext<SliderContextType | undefined>(undefined);