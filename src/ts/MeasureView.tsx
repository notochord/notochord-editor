import React from 'https://dev.jspm.io/react@16.9';
import { Measure } from 'notochord-song/types/measure';

import { bar, barHeight } from './svgConstants';
import { BeatView } from './BeatView';

interface MeasureViewProps {
  x: number;
  width: number;
  height: number;
  measure: Measure;
  isLastInRow: boolean;
  charData: CharData;
  scaleDegrees: boolean;
}

export class MeasureView extends React.Component<MeasureViewProps> {
  public render(): JSX.Element {
    const barScale = this.props.height / barHeight;
    const leftBar = (
      <path
        d={bar}
        transform={`scale(${barScale})`}
        style={{ strokeWidth: 1, stroke: 'black' }}
      />
    );
    const rightBar = this.props.isLastInRow ? (
      <path
        d={bar}
        transform={`translate(${this.props.width} 0) scale(${barScale})`}
        style={{ strokeWidth: 1, stroke: 'black' }}
      />
    ) : null;
    const beatMargin = this.props.width * 0.06;
    const beatWidthAndMargin = (this.props.width - beatMargin) / this.props.measure.length;
    const beatWidth = beatWidthAndMargin - beatMargin;
    const beatViews = this.props.measure.beats.map((beat, index) => {
      return (
        <BeatView
          key={index}
          x={beatMargin + (index * beatWidthAndMargin)}
          width={beatWidth}
          height={this.props.height}
          beat={beat}
          charData={this.props.charData}
          scaleDegrees={this.props.scaleDegrees}
        />
      );
    });
    return (
      <g className="NotochordMeasureView" transform={`translate(${this.props.x} 0)`}>
        {leftBar}
        {beatViews}
        {rightBar}
      </g>
    );
  }
}