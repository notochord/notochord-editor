// https://github.com/Microsoft/TypeScript/issues/28985#issuecomment-472743014
declare module 'https://dev.jspm.io/react@16.9' {
  import content = require('react');
  export default content;
}
declare module 'https://dev.jspm.io/tonal@2.2';

interface CharData {
  HWidth: number;
  HHeight: number;
  fontSize: number;
}