import React from 'https://dev.jspm.io/react@16.9';
import Song from 'notochord-song/types/notochord-song';
import { MeasureContainer, Measure } from 'notochord-song/types/measure';

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
      fontSize: this.props.fontSize,
    }

    const rowHeight = this.props.fontSize * 1.2;
    // Vertical space between rows.
    const rowYMargin = 0.3 * rowHeight;
    const innerWidth = this.props.width - 2;
    const measureWidth = innerWidth / this.props.cols;
    const topPadding = 30;

    const rows: JSX.Element[] = [];
    let freeMeasures: JSX.Element[] = [];
    const calcY = (): number => topPadding + ((rowHeight + rowYMargin) * rows.length);
    for(const { measure, ending, leftRepeat, rightRepeat, isLast } of this.getMeasuresAndRepeatInfo()) {
      const measureView = (
        <MeasureView
          key={freeMeasures.length}
          x={1 + (measureWidth * freeMeasures.length)}
          width={measureWidth}
          height={rowHeight}
          measure={measure}
          ending={ending}
          leftRepeat={leftRepeat}
          rightRepeat={rightRepeat}
          isLastInRow={freeMeasures.length === this.props.cols - 1 || isLast}
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
    this.props.song.onChange(() => {
      this.setState({});
    });
  }

  private *getMeasuresAndRepeatInfo(container: MeasureContainer = this.props.song.measureContainer): Generator<{ ending: number | null; measure: Measure; leftRepeat: boolean; rightRepeat: boolean; isLast: boolean }> {
    for (let i = 0; i < container.measures.length; i++) {
      const measure = container.measures[i];
      if ('type' in measure) {
        yield* this.getMeasuresAndRepeatInfo(measure);
      } else {
        let ending: null | number = null;
        let leftRepeat = false;
        let rightRepeat = false;
        let isLast = false;
        if (i === 0 && container.type === 'ending') {
          ending = container.repeatInfo.ending!;
        }
        if (i === 0 && container.type === 'repeat' && container.repeatInfo.repeatCount! > 1) {
          leftRepeat = true;
        }
        if (container.type === 'ending' && i === container.measures.length - 1 ) {
          rightRepeat = true;
        }
        if (measure === container.measures[container.measures.length - 1]) {
          isLast = true;
        }
        yield { measure, ending, leftRepeat, rightRepeat, isLast };
      }
    }
  }
}