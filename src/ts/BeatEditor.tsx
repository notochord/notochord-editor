import * as React from 'react';
import { Beat } from 'notochord-song';

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
    this.onKeyDown = this.onKeyDown.bind(this);
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
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
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

  private onOpen(): void {
    this.inputRef.current?.focus();
  }

  private onChange(): void {
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

  private onKeyDown(event: React.KeyboardEvent): boolean {
    switch(event.key) {
      case 'Enter':
      case 'Escape': {
        this.props.closeEditor();
        return false;
      }
      case 'Tab': {
        if (event.shiftKey) {
          this.focusPrevBeat()
          return false;
        }
        break;
      }
      case 'ArrowRight': {
        if (this.inputRef.current?.selectionStart === this.state.inputValue.length) {
          this.focusNextBeat()
          return false;
        }
        break;
      }
      case 'ArrowLeft': {
        if (this.inputRef.current?.selectionStart === 0) {
          this.focusPrevBeat()
          return false;
        }
        break;
      }
      case 'ArrowUp': {
        this.transpose(1);
        return false;
      }
      case 'ArrowDown': {
        this.transpose(-1);
        return false;
      }
      default: break;
    }
    return true;
  }

  private transpose(semitones: number): void {
    this.props.beat.changeBySemitones(semitones);
    this.setState({ inputValue: this.props.beat.chord ?? '' });
  }

  private focusPrevBeat(): void {
    // this is gonna be pretty janky
    const parentBeat = this.inputRef.current?.closest('.NotochordBeatView') as SVGGElement;
    if (!parentBeat) return;
    const allBeats = [...document.querySelectorAll('.NotochordBeatView')] as SVGGElement[];
    const index = allBeats.indexOf(parentBeat);
    if (index === -1 || index === 0) return;
    allBeats[index - 1].focus();
  }

  private focusNextBeat(): void {
    // this is gonna be pretty janky
    const parentBeat = this.inputRef.current?.closest('.NotochordBeatView') as SVGGElement;
    if (!parentBeat) return;
    const allBeats = [...document.querySelectorAll('.NotochordBeatView')] as SVGGElement[];
    const index = allBeats.indexOf(parentBeat);
    if (index === -1 || index === allBeats.length - 1) return;
    allBeats[index + 1].focus();
  }
}