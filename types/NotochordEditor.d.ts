/// <reference types="react" />
import React from 'https://dev.jspm.io/react@16.9';
import Song from 'notochord-song/types/notochord-song';
interface NotochordEditorProps {
    song: Song;
    showTitle: boolean;
    shouldResize: boolean;
    width: number;
    height: number;
    editable: boolean;
    fontSize: number;
    scaleDegrees: boolean;
}
interface NotochordEditorState {
}
export declare class NotochordEditor extends React.Component<NotochordEditorProps, NotochordEditorState> {
    static defaultProps: {
        showTitle: boolean;
        shouldResize: boolean;
        width: number;
        height: number;
        editable: boolean;
        fontSize: number;
        scaleDegrees: boolean;
    };
    private cols;
    private measureWidth;
    private rowHeight;
    private measureXPadding;
    private beatWidth;
    private H_HEIGHT;
    private topPadding;
    render(): JSX.Element;
}
export {};
