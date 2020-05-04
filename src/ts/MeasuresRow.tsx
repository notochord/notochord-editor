import * as React from 'react';

interface MeasuresRowProps {
  y: number;
}

export class MeasuresRow extends React.Component<MeasuresRowProps> {
  public render(): JSX.Element {
    return (
      <g className="NotochordMeasuresRow" transform={`translate(0 ${this.props.y})`}>
        {this.props.children}
      </g>
    );
  }
}