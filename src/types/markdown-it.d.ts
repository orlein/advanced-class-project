declare module 'markdown-it' {
  interface Options {
    [key: string]: any;
  }

  class MarkdownIt {
    constructor(presetName?: string, options?: Options);
    render(md: string): string;
  }

  export default MarkdownIt;
}
