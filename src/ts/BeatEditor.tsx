import React from 'https://dev.jspm.io/react@16.9';

interface BeatEditorProps {
  open: boolean;
  parentWidth: number;
}

export class BeatEditor extends React.Component<BeatEditorProps> {
  public render(): JSX.Element {
    return (
      <foreignObject
        width={66}
        height={27}
        y={-25}
        x={(66 - this.props.parentWidth) / 2 * -1}
        className={`NotochordChordEditor${this.props.open ? ' show' : ''}`}
      >
        <div
          // @ts-ignore
          xmlns="http://www.w3.org/1999/xhtml"
          className="NotochordChordEditorContainer"
        >
          <input/>
        </div>
      </foreignObject>
    );
  }
}