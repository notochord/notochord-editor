import React from 'https://dev.jspm.io/react@16.9';
import Song from 'notochord-song/types/notochord-song';

import { slabo27pxHHeightRatio, slabo27pxHWidthRatio } from './svgConstants';
import { MeasuresRow } from './MeasuresRow';
import { MeasureView } from './MeasureView';

interface NotochordEditorProps {
  song: Song;
  cols: number;
  width: number;
  height: number;
  editable: boolean;
  fontSize: number;
  scaleDegrees: boolean;
}
interface NotochordEditorState { /* eslint-disable-line */
  charData: CharData;
}

export class NotochordEditor extends React.Component<NotochordEditorProps, NotochordEditorState> {
  public static defaultProps = {
    cols: 4,
    width: 950,
    height: 600,
    editable: false,
    fontSize: 50,
    scaleDegrees: false,
  }
  
  public render(): JSX.Element {
    const charData: CharData = {
      HWidth: this.props.fontSize * slabo27pxHWidthRatio,
      HHeight: this.props.fontSize * slabo27pxHHeightRatio,
    }

    const rowHeight = this.props.fontSize * 1.2;
    // Vertical space between rows.
    const rowYMargin = 0.3 * rowHeight;
    const innerWidth = this.props.width - 2;
    const measureWidth = innerWidth / this.props.cols;
    const topPadding = 0.5 * (rowHeight - charData.HHeight);

    const rows: JSX.Element[] = [];
    let freeMeasures: JSX.Element[] = [];
    const calcY = (): number => topPadding + ((rowHeight + rowYMargin) * rows.length);
    for(const measure of this.props.song.measures) {
      const measureView = (
        <MeasureView
          key={freeMeasures.length}
          x={measureWidth * freeMeasures.length}
          width={measureWidth}
          height={rowHeight}
          measure={measure}
          isLastInRow={freeMeasures.length === this.props.cols - 1}
          charData={charData}
          scaleDegrees={this.props.scaleDegrees}
        />
      );
      freeMeasures.push(measureView);
      if (freeMeasures.length === this.props.cols) {
        rows.push(
          <MeasuresRow key={rows.length} y={calcY()}>
            {freeMeasures}
          </MeasuresRow>
        );
        freeMeasures = [];
      }
    }
    if (freeMeasures.length) {
      rows.push(
        <MeasuresRow key={rows.length} y={calcY()}>
          {freeMeasures}
        </MeasuresRow>
      );
    }
    return (
      <svg
        className="NotochordSVGElement NotochordEditable"
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        style={{ fontSize: this.props.fontSize }}
        width={this.props.width}
      >
        {rows}
      </svg>
    );
  }
  public componentDidMount(): void {
    // this.props.song.onChange(() => {
    //   this.setState({});
    // });
  }
}