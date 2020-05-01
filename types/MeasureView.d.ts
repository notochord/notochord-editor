/// <reference types="react" />
import React from 'https://dev.jspm.io/react@16.9';
import { Measure } from 'notochord-song/types/measure';
interface MeasureViewProps {
    x: number;
    width: number;
    height: number;
    measure: Measure;
    ending: number | null;
    leftRepeat: boolean;
    rightRepeat: boolean;
    isLastInRow: boolean;
    charData: CharData;
    scaleDegrees: boolean;
}
export declare class MeasureView extends React.Component<MeasureViewProps> {
    render(): JSX.Element;
}
export {};
