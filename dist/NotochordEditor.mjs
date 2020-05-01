/**
 * notochord-editor by Jacob Bloom
 * This software is provided as-is, yadda yadda yadda
 */

import React from 'https://dev.jspm.io/react@16.9';
import Tonal from 'https://dev.jspm.io/tonal@2.2';

// https://commons.wikimedia.org/wiki/File:B%C3%A9mol.svg
const flat = 'm 1.380956,10.84306 -0.02557,1.68783 0,0.28131 c 0,0.56261 0.02557,1.12522 0.102293,1.68783 1.150797,-0.97178 2.378313,-2.04586 2.378313,-3.55468 0,-0.84392 -0.358026,-1.7134103 -1.09965,-1.7134103 -0.792771,0 -1.329809,0.7672 -1.355382,1.6111203 z M 0.306879,15.42067 0,0.20457992 C 0.204586,0.07671992 0.460319,-7.6580061e-8 0.690478,-7.6580061e-8 0.920637,-7.6580061e-8 1.17637,0.07669992 1.380956,0.20457992 L 1.201943,9.0273597 c 0.639331,-0.53704 1.483249,-0.8695 2.327166,-0.8695 1.329809,0 2.27602,1.22752 2.27602,2.6084803 0,2.04586 -2.1993,2.99207 -3.759269,4.32188 C 1.662261,15.42067 1.432102,16.06 0.895064,16.06 0.562612,16.06 0.306879,15.77869 0.306879,15.42067 Z';
const flatHeight = 16.059999465942383;
// https://commons.wikimedia.org/wiki/File:Di%C3%A8se.svg
const sharp = 'm 4.6252809,-11.71096 c 0,-0.21414 -0.1713067,-0.40686 -0.38544,-0.40686 -0.2141334,0 -0.4068535,0.19272 -0.4068535,0.40686 l 0,3.1049303 -1.777307,-0.66381 0,-3.3833103 c 0,-0.21413 -0.19272,-0.40685 -0.4068534,-0.40685 -0.2141334,0 -0.3854401,0.19272 -0.3854401,0.40685 l 0,3.1049303 -0.68522678,-0.25696 c -0.0428267,-0.0214 -0.10706669,-0.0214 -0.14989337,-0.0214 C 0.19272004,-9.8265897 0,-9.6338697 0,-9.3983197 l 0,1.2847998 c 0,0.1713 0.10706669,0.34261 0.27837339,0.40685 l 0.98501351,0.34261 0,3.42614 -0.68522678,-0.23555 c -0.0428267,-0.0214 -0.10706669,-0.0214 -0.14989337,-0.0214 C 0.19272004,-4.1948799 0,-4.0021599 0,-3.7666099 l 0,1.2848 c 0,0.1713 0.10706669,0.3212 0.27837339,0.38544 l 0.98501351,0.36402 0,3.38331 c 0,0.21413 0.1713067,0.40685 0.3854401,0.40685 0.2141334,0 0.4068534,-0.19272 0.4068534,-0.40685 l 0,-3.10493 1.777307,0.66380998 0,3.38331002 c 0,0.21413 0.1927201,0.40685 0.4068535,0.40685 0.2141333,0 0.38544,-0.19272 0.38544,-0.40685 l 0,-3.10494002 0.6852268,0.25696 c 0.042827,0.0214 0.1070667,0.0214 0.1498934,0.0214 0.2355467,0 0.4282668,-0.19272 0.4282668,-0.42827 l 0,-1.28479998 c 0,-0.17131 -0.1070667,-0.34261 -0.2783734,-0.40685 l -0.9850136,-0.34262 0,-3.42613 0.6852268,0.23554 c 0.042827,0.0214 0.1070667,0.0214 0.1498934,0.0214 0.2355467,0 0.4282668,-0.19272 0.4282668,-0.42827 l 0,-1.2848 c 0,-0.17131 -0.1070667,-0.3212 -0.2783734,-0.38544 l -0.9850136,-0.36403 0,-3.3833001 z m -2.5696005,8.0728301 0,-3.42614 1.777307,0.6424 0,3.42614 z';
const sharpHeight = 16.059999465942383;
const deltaChar = '\u0394';
const slabo27pxHWidthRatio = 30 / 50;
const slabo27pxHHeightRatio = 33.33 / 50;

class MeasuresRow extends React.Component {
    render() {
        return (React.createElement("g", { className: "NotochordMeasuresRow", transform: `translate(0 ${this.props.y})` }, this.props.children));
    }
}

class BeatEditor extends React.Component {
    constructor(props) {
        var _a, _b;
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            inputValue: (_b = (_a = this.props.beat) === null || _a === void 0 ? void 0 : _a.chord) !== null && _b !== void 0 ? _b : '',
        };
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    render() {
        return (React.createElement("foreignObject", { width: 66, height: 27, y: -25, x: (66 - this.props.parentWidth) / 2 * -1, className: `NotochordChordEditor${this.props.open ? ' show' : ''}` },
            React.createElement("div", { 
                // @ts-ignore
                xmlns: "http://www.w3.org/1999/xhtml", className: "NotochordChordEditorContainer" },
                React.createElement("input", { ref: this.inputRef, value: this.state.inputValue, onChange: this.onChange, onKeyDown: this.onKeyDown, onBlur: this.props.closeEditor }))));
    }
    componentDidUpdate(prevProps) {
        if (this.props.open && !prevProps.open) {
            this.onOpen();
        }
    }
    onOpen() {
        var _a;
        (_a = this.inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }
    onChange() {
        var _a, _b;
        const oldValue = this.props.beat.chord;
        const inputValue = (_b = (_a = this.inputRef.current) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
        this.props.beat.chord = inputValue || null;
        const newValue = this.props.beat.chord;
        if (newValue === oldValue) { // chord didn't change, the input is invalid
            this.setState({ inputValue: inputValue });
        }
        else {
            this.setState({ inputValue: newValue !== null && newValue !== void 0 ? newValue : '' });
        }
    }
    onKeyDown(event) {
        var _a, _b;
        switch (event.key) {
            case 'Enter':
            case 'Escape': {
                this.props.closeEditor();
                return false;
            }
            case 'Tab': {
                if (event.shiftKey) {
                    this.focusPrevBeat();
                    return false;
                }
                break;
            }
            case 'ArrowRight': {
                if (((_a = this.inputRef.current) === null || _a === void 0 ? void 0 : _a.selectionStart) === this.state.inputValue.length) {
                    this.focusNextBeat();
                    return false;
                }
                break;
            }
            case 'ArrowLeft': {
                if (((_b = this.inputRef.current) === null || _b === void 0 ? void 0 : _b.selectionStart) === 0) {
                    this.focusPrevBeat();
                    return false;
                }
                break;
            }
            case 'ArrowUp': {
                this.transpose('up');
                return false;
            }
            case 'ArrowDown': {
                this.transpose('down');
                return false;
            }
        }
        return true;
    }
    transpose(dir) {
        const chordParts = Tonal.Chord.tokenize(this.props.beat.chord);
        chordParts[0] = Tonal.Note.enharmonic(Tonal.transpose(chordParts[0], dir === 'up' ? 'm2' : 'm-2'));
        this.props.beat.chord = chordParts.join('');
        this.setState({ inputValue: this.props.beat.chord });
    }
    focusPrevBeat() {
        var _a;
        // this is gonna be pretty janky
        const parentBeat = (_a = this.inputRef.current) === null || _a === void 0 ? void 0 : _a.closest('.NotochordBeatView');
        if (!parentBeat)
            return;
        const allBeats = [...document.querySelectorAll('.NotochordBeatView')];
        const index = allBeats.indexOf(parentBeat);
        if (index === -1 || index === 0)
            return;
        allBeats[index - 1].focus();
    }
    focusNextBeat() {
        var _a;
        // this is gonna be pretty janky
        const parentBeat = (_a = this.inputRef.current) === null || _a === void 0 ? void 0 : _a.closest('.NotochordBeatView');
        if (!parentBeat)
            return;
        const allBeats = [...document.querySelectorAll('.NotochordBeatView')];
        const index = allBeats.indexOf(parentBeat);
        if (index === -1 || index === allBeats.length - 1)
            return;
        allBeats[index + 1].focus();
    }
}

class BeatView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorOpen: false,
        };
        this.openEditor = this.openEditor.bind(this);
        this.closeEditor = this.closeEditor.bind(this);
    }
    render() {
        const { rootText, accidentalText } = this.getRootText();
        const bottomText = this.getBottomText();
        let accidental = null;
        if (accidentalText) {
            const goalHeight = (this.props.charData.HHeight * 0.6);
            const x = this.props.charData.HWidth - 1;
            const origHeight = accidentalText === '#' ? sharpHeight : flatHeight;
            let y = (0.2 * this.props.charData.HHeight);
            if (accidentalText === '#')
                y += goalHeight; // # is above its origin, b is below
            const scale = goalHeight / origHeight;
            accidental = (React.createElement("path", { d: accidentalText === '#' ? sharp : flat, transform: `translate(${x}, ${y}) scale(${scale})` }));
        }
        const chordRootY = 0.3 * this.props.charData.HHeight;
        const bottom = (React.createElement("text", { transform: `translate(${this.props.charData.HWidth + 3} ${chordRootY + (0.5 * this.props.charData.HHeight)}) scale(0.5)` }, bottomText));
        const editor = (React.createElement(BeatEditor, { beat: this.props.beat, open: this.state.editorOpen, parentWidth: this.props.width, closeEditor: this.closeEditor }));
        return (React.createElement("g", { className: "NotochordBeatView", transform: `translate(${this.props.x} 0)`, tabIndex: 0, onFocus: this.openEditor },
            React.createElement("rect", { className: "NotochordBeatViewBackground", width: this.props.width, height: this.props.height }),
            React.createElement("text", { transform: `translate(0 ${chordRootY})` }, rootText),
            accidental,
            bottom,
            editor));
    }
    getRootText() {
        if (!this.props.beat.chord) {
            return {
                rootText: '',
                accidentalText: '',
            };
        }
        else if (this.props.scaleDegrees) {
            const degree = this.props.beat.scaleDegree;
            return {
                rootText: degree.numeral,
                accidentalText: degree.flat ? 'b' : '',
            };
        }
        else {
            const [rootPart] = Tonal.Chord.tokenize(this.props.beat.chord);
            let accidentalText = '';
            if (rootPart[1] === 'b')
                accidentalText = 'b';
            if (rootPart[1] === '#')
                accidentalText = '#';
            return {
                accidentalText,
                rootText: rootPart[0],
            };
        }
    }
    getBottomText() {
        let bottomText = Tonal.Chord.tokenize(this.props.beat.chord)[1];
        if (!bottomText)
            return '';
        bottomText = bottomText.replace(/M(?=7|9|11|13)/, deltaChar);
        bottomText = bottomText.replace(/m/g, '-');
        return bottomText;
    }
    openEditor() {
        this.setState({ editorOpen: true });
    }
    closeEditor() {
        this.setState({ editorOpen: false });
    }
}

class MeasureView extends React.Component {
    render() {
        const leftBar = (React.createElement("path", { d: `M 0,0 0,${this.props.height}`, style: { strokeWidth: 1, stroke: 'black' } }));
        const rightBar = this.props.isLastInRow ? (React.createElement("path", { d: `M ${this.props.width},0 ${this.props.width},${this.props.height}`, style: { strokeWidth: 1, stroke: 'black' } })) : null;
        const ending = this.props.ending && (React.createElement(React.Fragment, null,
            React.createElement("text", { x: this.props.width * 0.02, y: this.props.height * -.17, fontSize: this.props.charData.fontSize * 0.25 }, this.props.ending),
            React.createElement("path", { d: `M 0,${this.props.height * -.05} 0,${this.props.height * -.2} ${this.props.width},${this.props.height * -.2}`, style: { strokeWidth: 1, stroke: 'black', fill: 'none' } })));
        const leftRepeat = this.props.leftRepeat ? (React.createElement(React.Fragment, null,
            React.createElement("circle", { cx: this.props.width * 0.03, cy: this.props.height * 0.4, r: this.props.height * 0.03 }),
            React.createElement("circle", { cx: this.props.width * 0.03, cy: this.props.height * 0.6, r: this.props.height * 0.03 }))) : null;
        const rightRepeat = this.props.rightRepeat ? (React.createElement(React.Fragment, null,
            React.createElement("circle", { cx: this.props.width * 0.97, cy: this.props.height * 0.4, r: this.props.height * 0.03 }),
            React.createElement("circle", { cx: this.props.width * 0.97, cy: this.props.height * 0.6, r: this.props.height * 0.03 }))) : null;
        const beatMargin = this.props.width * 0.06;
        const beatWidthAndMargin = (this.props.width - beatMargin) / this.props.measure.length;
        const beatWidth = beatWidthAndMargin - beatMargin;
        const beatViews = this.props.measure.beats.map((beat, index) => {
            return (React.createElement(BeatView, { key: index, x: beatMargin + (index * beatWidthAndMargin), width: beatWidth, height: this.props.height, beat: beat, charData: this.props.charData, scaleDegrees: this.props.scaleDegrees }));
        });
        return (React.createElement("g", { className: "NotochordMeasureView", transform: `translate(${this.props.x} 0)` },
            ending,
            leftBar,
            leftRepeat,
            beatViews,
            rightRepeat,
            rightBar));
    }
}

class NotochordEditor extends React.Component {
    render() {
        const charData = {
            HWidth: this.props.fontSize * slabo27pxHWidthRatio,
            HHeight: this.props.fontSize * slabo27pxHHeightRatio,
            fontSize: this.props.fontSize,
        };
        const rowHeight = this.props.fontSize * 1.2;
        // Vertical space between rows.
        const rowYMargin = 0.3 * rowHeight;
        const innerWidth = this.props.width - 2;
        const measureWidth = innerWidth / this.props.cols;
        const topPadding = 30;
        const rows = [];
        let freeMeasures = [];
        const calcY = () => topPadding + ((rowHeight + rowYMargin) * rows.length);
        for (const { measure, ending, leftRepeat, rightRepeat, isLast } of this.getMeasuresAndRepeatInfo()) {
            const measureView = (React.createElement(MeasureView, { key: freeMeasures.length, x: 1 + (measureWidth * freeMeasures.length), width: measureWidth, height: rowHeight, measure: measure, ending: ending, leftRepeat: leftRepeat, rightRepeat: rightRepeat, isLastInRow: freeMeasures.length === this.props.cols - 1 || isLast, charData: charData, scaleDegrees: this.props.scaleDegrees }));
            freeMeasures.push(measureView);
            if (freeMeasures.length === this.props.cols) {
                rows.push(React.createElement(MeasuresRow, { key: rows.length, y: calcY() }, freeMeasures));
                freeMeasures = [];
            }
        }
        if (freeMeasures.length) {
            rows.push(React.createElement(MeasuresRow, { key: rows.length, y: calcY() }, freeMeasures));
        }
        return (React.createElement("svg", { className: "NotochordSVGElement NotochordEditable", viewBox: `0 0 ${this.props.width} ${this.props.height}`, style: { fontSize: this.props.fontSize }, width: this.props.width }, rows));
    }
    componentDidMount() {
        this.props.song.onChange(() => {
            this.setState({});
        });
    }
    *getMeasuresAndRepeatInfo(container = this.props.song.measureContainer) {
        for (let i = 0; i < container.measures.length; i++) {
            const measure = container.measures[i];
            if ('type' in measure) {
                yield* this.getMeasuresAndRepeatInfo(measure);
            }
            else {
                let ending = null;
                let leftRepeat = false;
                let rightRepeat = false;
                let isLast = false;
                if (i === 0 && container.type === 'ending') {
                    ending = container.repeatInfo.ending;
                }
                if (i === 0 && container.type === 'repeat' && container.repeatInfo.repeatCount > 1) {
                    leftRepeat = true;
                }
                if (container.type === 'ending' && i === container.measures.length - 1) {
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
NotochordEditor.defaultProps = {
    cols: 4,
    width: 950,
    height: 600,
    editable: false,
    fontSize: 50,
    scaleDegrees: false,
};

export { NotochordEditor };
