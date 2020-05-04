import * as React from 'react';
import { Measure } from 'notochord-song';
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
    editable: boolean;
}
export declare class MeasureView extends React.Component<MeasureViewProps> {
    render(): JSX.Element;
}
export {};
