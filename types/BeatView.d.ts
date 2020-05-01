/// <reference types="react" />
import React from 'https://dev.jspm.io/react@16.9';
import Beat from 'notochord-song/types/beat';
interface BeatViewProps {
    x: number;
    width: number;
    height: number;
    beat: Beat;
    charData: CharData;
    scaleDegrees: boolean;
}
export declare class BeatView extends React.Component<BeatViewProps> {
    render(): JSX.Element;
    private getRootText;
    private getBottomText;
    private openEditor;
}
export {};
