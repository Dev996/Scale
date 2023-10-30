import React from "react";

export interface SliderRangeProps {
    min?: number;
    max?: number;
    value?: number;
    values?: number[];
    range?: boolean;
    onChange?: (value: number | [number, number]) => void;
}

export type SliderContextType = {
    min: number;
    max: number;
    range: boolean;
    sliderValue: number;
    sliderValues: [number, number];
    setSliderValue: React.Dispatch<React.SetStateAction<number>>;
    setSliderValues: React.Dispatch<React.SetStateAction<[number, number]>>;
}

export interface SliderRangeThumbProps {
    calculateValue: (value: number) => number,
    verifyThumb: (value: number) => boolean
}

export interface SliderTrackProps {
    calculateValue: (value: number) => number,
    checkFirstThumbMoved: (value: number) => boolean
}

export interface SliderInputProps {
    callBack: (value: string) => void,
    value: number
}