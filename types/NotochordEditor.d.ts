import * as React from 'react';
import { Song } from 'notochord-song';
interface NotochordEditorProps {
    song: Song;
    cols: number;
    width: number;
    height: number;
    editable: boolean;
    fontSize: number;
    scaleDegrees: boolean;
}
interface NotochordEditorState {
    charData: CharData;
}
export declare class NotochordEditor extends React.Component<NotochordEditorProps, NotochordEditorState> {
    static defaultProps: {
        cols: number;
        width: number;
        height: number;
        editable: boolean;
        fontSize: number;
        scaleDegrees: boolean;
    };
    render(): JSX.Element;
    componentDidMount(): void;
    private getMeasuresAndRepeatInfo;
}
export {};
