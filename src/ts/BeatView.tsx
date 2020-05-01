import React from 'https://dev.jspm.io/react@16.9';
import Tonal from 'https://dev.jspm.io/tonal@2.2';
import Beat from 'notochord-song/types/beat';

import { deltaChar, sharp, sharpHeight, flat, flatHeight } from './svgConstants';
import { BeatEditor } from './BeatEditor';

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

export class BeatView extends React.Component<BeatViewProps, BeatViewState> {
  public state = {
    editorOpen: false,
  }
  public constructor(props: BeatViewProps) {
    super(props);
    this.openEditor = this.openEditor.bind(this);
    this.closeEditor = this.closeEditor.bind(this);
  }
  public render(): JSX.Element {
    const { rootText, accidentalText } = this.getRootText();
    const bottomText = this.getBottomText();
    let accidental: JSX.Element | null = null;
    if (accidentalText) {
      const goalHeight = (this.props.charData.HHeight * 0.6);
      const x = this.props.charData.HWidth - 1;
      const origHeight = accidentalText === '#' ? sharpHeight : flatHeight;
      let y = (0.2 * this.props.charData.HHeight);
      if (accidentalText === '#') y += goalHeight; // # is above its origin, b is below
      const scale = goalHeight / origHeight;
      accidental = (
        <path
          d={ accidentalText === '#' ? sharp : flat }
          transform={`translate(${x}, ${y}) scale(${scale})`}
        />
      );
    }
    const chordRootY = 0.3 * this.props.charData.HHeight;
    const bottom = (
      <text
        transform={`translate(${this.props.charData.HWidth + 3} ${chordRootY + (0.5 * this.props.charData.HHeight)}) scale(0.5)`}
      >
        {bottomText}
      </text>
    );
    const editor = (
      <BeatEditor
        beat={this.props.beat}
        open={this.state.editorOpen}
        parentWidth={this.props.width}
        closeEditor={this.closeEditor}
      />
    );
    return (
      <g
        className="NotochordBeatView"
        transform={`translate(${this.props.x} 0)`}
        tabIndex={0}
        onFocus={this.openEditor}
      >
        <rect
          className="NotochordBeatViewBackground"
          width={this.props.width}
          height={this.props.height}
        />
        <text transform={`translate(0 ${chordRootY})`}>{rootText}</text>
        {accidental}
        {bottom}
        {editor}
      </g>
    );
  }

  private getRootText(): { rootText: string; accidentalText: 'b' | '#' | '' } {
    if (!this.props.beat.chord) {
      return {
        rootText: '',
        accidentalText: '',
      }
    } else if (this.props.scaleDegrees) {
      const degree = this.props.beat.scaleDegree;
      return {
        rootText: degree.numeral,
        accidentalText: degree.flat ? 'b' : '',
      }
    } else {
      const [rootPart] = Tonal.Chord.tokenize(this.props.beat.chord) as string[];
      let accidentalText: 'b' | '#' | '' = '';
      if (rootPart[1] === 'b') accidentalText = 'b';
      if (rootPart[1] === '#') accidentalText = '#';
      return {
        accidentalText,
        rootText: rootPart[0],
      };
    }
  }

  private getBottomText(): string {
    let bottomText: string | undefined = Tonal.Chord.tokenize(this.props.beat.chord)[1];
    if(!bottomText) return '';
    bottomText = bottomText.replace(/M(?=7|9|11|13)/, deltaChar);
    bottomText = bottomText.replace(/m/g, '-');
    return bottomText;
  }

  private openEditor(): void {
    if (this.props.editable) this.setState({ editorOpen: true });
  }

  private closeEditor(): void {
    this.setState({ editorOpen: false });
  }
}