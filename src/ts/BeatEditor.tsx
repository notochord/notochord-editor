import React from 'https://dev.jspm.io/react@16.9';
import Beat from 'notochord-song/types/beat';

interface BeatEditorProps {
  beat: Beat;
  open: boolean;
  parentWidth: number;
  closeEditor: () => void;
}

interface BeatEditorState {
  inputValue: string;
}

export class BeatEditor extends React.Component<BeatEditorProps, BeatEditorState> {
  public inputRef = React.createRef<HTMLInputElement>();
  public state = {
    inputValue: this.props.beat?.chord ?? '',
  }

  public constructor(props: BeatEditorProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

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
          <input
            ref={this.inputRef}
            value={this.state.inputValue}
            onChange={this.onChange.bind(this)}
            onBlur={this.props.closeEditor}
          />
        </div>
      </foreignObject>
    );
  }

  public componentDidUpdate(prevProps: BeatEditorProps): void {
    if (this.props.open && !prevProps.open) {
      this.onOpen();
    }
  }

  public onOpen(): void {
    this.inputRef.current?.focus();
  }

  public onChange(): void {
    const oldValue = this.props.beat.chord;
    const inputValue = this.inputRef.current?.value ?? '';
    this.props.beat.chord = inputValue || null;
    const newValue = this.props.beat.chord;
    if (newValue === oldValue) { // chord didn't change, the input is invalid
      this.setState({ inputValue: inputValue });
    } else {
      this.setState({ inputValue: newValue ?? '' });
    }
  }
}