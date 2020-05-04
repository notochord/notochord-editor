import * as React from 'react';
import { Beat } from 'notochord-song';
interface BeatViewProps {
    x: number;
    width: number;
    height: number;
    beat: Beat;
    charData: CharData;
    scaleDegrees: boolean;
    editable: boolean;
}
interface BeatViewState {
    editorOpen: boolean;
}
export declare class BeatView extends React.Component<BeatViewProps, BeatViewState> {
    state: {
        editorOpen: boolean;
    };
    constructor(props: BeatViewProps);
    render(): JSX.Element;
    private getRootText;
    private getBottomText;
    private openEditor;
    private closeEditor;
}
export {};
