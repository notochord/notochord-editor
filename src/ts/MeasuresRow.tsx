import React from 'https://dev.jspm.io/react@16.9';

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