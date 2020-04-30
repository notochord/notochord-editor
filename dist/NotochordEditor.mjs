/**
 * notochord-editor by Jacob Bloom
 * This software is provided as-is, yadda yadda yadda
 */

import React from 'https://dev.jspm.io/react@16.9';

class NotochordEditor extends React.Component {
    constructor() {
        super(...arguments);
        /* constants for layout and stuff */
        this.cols = 4;
        this.measureWidth = 237;
        this.rowHeight = 60;
        this.measureXPadding = 18.96;
        this.beatWidth = 54.51;
        this.H_HEIGHT = 33.33;
        this.topPadding = 13.335;
    }
    render() {
        // Vertical space between rows.
        const rowYMargin = 0.3 * this.rowHeight;
        const innerWidth = this.props.width - 2;
        // SVG width for each measure.
        // @todo: shorten to 2 if the width/fontsize ratio is ridiculous?
        this.measureWidth = innerWidth / this.cols;
        this.measureXPadding = this.measureWidth * .08;
        const measureInnerWidth = this.measureWidth - this.measureXPadding;
        // SVG distance between beats in a measure.
        this.beatWidth = measureInnerWidth / this.cols;
        // this.H_HEIGHT = this.props.fontSize * viewer.PATHS.slabo27px_H_height_ratio;
        this.topPadding = 0.5
            * (this.rowHeight - this.H_HEIGHT);
        const rows = [];
        let freeMeasures = [];
        for (const measure of this.props.song.measures) {
            const key = `row${rows.length} col${freeMeasures.length}`;
            const x = this.measureWidth * freeMeasures.length;
            const measureView = (React.createElement("text", { x: x, key: key }, measure.beats[0].chord));
            freeMeasures.push(measureView);
            if (freeMeasures.length === this.cols) {
                rows.push(React.createElement("g", { key: `row${rows.length}`, transform: `translate(0 ${this.rowHeight * rows.length})` }, freeMeasures));
                freeMeasures = [];
            }
        }
        if (freeMeasures.length) {
            rows.push(React.createElement("g", { key: `row${rows.length}`, transform: `translate(0 ${this.rowHeight * rows.length})` }, freeMeasures));
        }
        return (React.createElement("svg", { className: "NotochordSVGElement", viewBox: `0 0 ${this.props.width} ${this.props.height}`, style: { fontSize: this.props.fontSize }, width: this.props.width }, rows));
    }
}
NotochordEditor.defaultProps = {
    showTitle: true,
    shouldResize: false,
    width: 1400,
    height: 600,
    editable: false,
    fontSize: 50,
    scaleDegrees: false,
};

export { NotochordEditor };
