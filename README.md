# Reacr-Markdown-Editor

> Markdown editor for React JS

[![NPM](https://img.shields.io/npm/v/react-markdown-editor.svg)](https://www.npmjs.com/package/react-markdown-editor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-edit-it

```

## Usage

```jsx
import React, { Component } from "react";

import ReactMarkdownEditor from "react-edit-it";

class Example extends Component {
  onChangeContent = props => {
    console.log("props" + props);
  };

  render() {
    return (
      <ReactMarkdownEditor
        content="demo"
        onChangeContent={this.onChangeContent}
      />
    );
  }
}
```

## License

MIT © [HasiniWijerathna](https://github.com/HasiniWijerathna)
