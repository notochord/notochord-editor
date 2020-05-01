import React from 'https://dev.jspm.io/react@16.9';
import { Measure } from 'notochord-song/types/measure';

import { BeatView } from './BeatView';

interface MeasureViewProps {
  x: number;
  width: number;
  height: number;
  measure: Measure;
  ending: number | null;
  leftRepeat: boolean;
  rightRepeat: boolean;
  isLastInRow: boolean;
  charData: CharData;
  scaleDegrees: boolean;
  editable: boolean;
}

export class MeasureView extends React.Component<MeasureViewProps> {
  public render(): JSX.Element {
    const leftBar = (
      <path
        d={`M 0,0 0,${this.props.height}`}
        style={{ strokeWidth: 1, stroke: 'black' }}
      />
    );
    const rightBar = this.props.isLastInRow ? (
      <path
        d={`M ${this.props.width},0 ${this.props.width},${this.props.height}`}
        style={{ strokeWidth: 1, stroke: 'black' }}
      />
    ) : null;
    const ending = this.props.ending && (
      <>
        <text
          x={this.props.width * 0.02}
          y={this.props.height * -.17}
          fontSize={this.props.charData.fontSize * 0.25}
        >
          {this.props.ending}
        </text>
        <path
          d={`M 0,${this.props.height * -.05} 0,${this.props.height * -.2} ${this.props.width},${this.props.height * -.2}`}
          style={{ strokeWidth: 1, stroke: 'black', fill: 'none' }}
        />
      </>
    );
    const leftRepeat = this.props.leftRepeat ? (
      <>
        <circle cx={this.props.width * 0.03} cy={this.props.height * 0.4} r={this.props.height * 0.03} />
        <circle cx={this.props.width * 0.03} cy={this.props.height * 0.6} r={this.props.height * 0.03} />
      </>
    ) : null;
    const rightRepeat = this.props.rightRepeat ? (
      <>
        <circle cx={this.props.width * 0.97} cy={this.props.height * 0.4} r={this.props.height * 0.03} />
        <circle cx={this.props.width * 0.97} cy={this.props.height * 0.6} r={this.props.height * 0.03} />
      </>
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
          editable={this.props.editable}
        />
      );
    });
    return (
      <g className="NotochordMeasureView" transform={`translate(${this.props.x} 0)`}>
        {ending}
        {leftBar}
        {leftRepeat}
        {beatViews}
        {rightRepeat}
        {rightBar}
      </g>
    );
  }
}