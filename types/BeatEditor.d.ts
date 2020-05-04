import * as React from 'react';
import { Beat } from 'notochord-song';
interface BeatEditorProps {
    beat: Beat;
    open: boolean;
    parentWidth: number;
    closeEditor: () => void;
}
interface BeatEditorState {
    inputValue: string;
}
export declare class BeatEditor extends React.Component<BeatEditorProps, BeatEditorState> {
    inputRef: React.RefObject<HTMLInputElement>;
    state: {
        inputValue: any;
    };
    constructor(props: BeatEditorProps);
    render(): JSX.Element;
    componentDidUpdate(prevProps: BeatEditorProps): void;
    private onOpen;
    private onChange;
    private onKeyDown;
    private transpose;
    private focusPrevBeat;
    private focusNextBeat;
}
export {};
