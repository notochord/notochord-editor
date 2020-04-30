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
interface NotochordEditorState { /* eslint-disable-line */
}

export class NotochordEditor extends React.Component<NotochordEditorProps, NotochordEditorState> {
  public static defaultProps = {
    showTitle: true,
    shouldResize: false,
    width: 1400,
    height: 600,
    editable: false,
    fontSize: 50,
    scaleDegrees: false,
  }

  /* constants for layout and stuff */
  private cols = 4;
  private measureWidth = 237;
  private rowHeight = 60;
  private measureXPadding = 18.96;
  private beatWidth = 54.51;
  private H_HEIGHT = 33.33;
  private topPadding = 13.335;
  
  public render(): JSX.Element {
    // Vertical space between rows.
    const rowYMargin = 0.3 * this.rowHeight;

    const innerWidth = this.props.width - 2;

    // SVG width for each measure.
    // @todo: shorten to 2 if the width/fontsize ratio is ridiculous?
    this.measureWidth = innerWidth / this.cols;
    this.measureXPadding = this.measureWidth * .08;
    const measureInnerWidth = this.measureWidth - this.measureXPadding;
    // SVG distance between beats in a measure.
    this.beatWidth = measureInnerWidth / this.cols;
    
    // this.H_HEIGHT = this.props.fontSize * viewer.PATHS.slabo27px_H_height_ratio;
    this.topPadding = 0.5
      * (this.rowHeight - this.H_HEIGHT);

    const rows: JSX.Element[] = [];
    let freeMeasures: JSX.Element[] = [];
    for(const measure of this.props.song.measures) {
      const key = `row${rows.length} col${freeMeasures.length}`;
      const x = this.measureWidth * freeMeasures.length;
      const measureView = (
        <text x={x} key={key}>{measure.beats[0].chord}</text>
      );
      freeMeasures.push(measureView);
      if (freeMeasures.length === this.cols) {
        rows.push(
          <g key={`row${rows.length}`} transform={`translate(0 ${this.rowHeight * rows.length})`}>
            {freeMeasures}
          </g>
        );
        freeMeasures = [];
      }
    }
    if (freeMeasures.length) {
      rows.push(
        <g key={`row${rows.length}`} transform={`translate(0 ${this.rowHeight * rows.length})`}>
          {freeMeasures}
        </g>
      );
    }
    return (
      <svg
        className="NotochordSVGElement"
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        style={{ fontSize: this.props.fontSize }}
        width={this.props.width}
      >
        {rows}
      </svg>
    );
  }
}