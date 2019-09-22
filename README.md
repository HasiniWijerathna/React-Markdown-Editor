#  :rocket: React-Markdown-Editor 

> Markdown editor for React JS

[![NPM](https://img.shields.io/npm/v/react-markdown-editor.svg)](https://www.npmjs.com/package/react-markdown-editor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![usage](https://user-images.githubusercontent.com/20472144/65385802-53455980-dd65-11e9-816b-b18df1efeb72.gif)

## Installation 

Can be installed via npm:

```bash
npm install --save react-edit-it 

```
Or ```yarn```

```bash
yarn add react-edit-it 

```

##  :bowtie: Basic Usage 

The most basic use of the markdown editor can be described with:

```jsx
import React, { Component } from "react";

import ReactMarkdownEditor from "react-edit-it";

class Example extends Component {
  onChangeContent = props => {
    // Access Props
  };

  render() {
    return (
      <ReactMarkdownEditor
      // Pass the text content to be converted to markdown as props
        content="demo"
        onChangeContent={this.onChangeContent}
      />
    );
  }
}
```
```onChangeContent``` event handler fires each time when the content has been edited. You can use it to access the editor text content

![usage](https://user-images.githubusercontent.com/20472144/65385837-ed0d0680-dd65-11e9-959f-13d96ed20a48.gif)

## Compatibility

### React

Compatible with the latest version of 16.x

#### Latest compatible versions:
- 15.x and 16.x

## Options

| Property          | Type           | Description                              |
| ------------------|:--------------:| ----------------------------------------:|
| content           | string         |         Markdown content to be converted |
| onChangeContent   | func           |Called when the editor content is updated |

## Sample Code 



Code sample is available in the /example directory for your perusal. You can execute npm install to generate the necessary dependencies for the examples.

if you haven't, You may need to install,

- npm or nvm (Go with nvm, its much easier to swicth versions! :neckbeard:)
- Node 8.16.0 or Node 10.16.0 or later version 



## License

MIT © [HasiniWijerathna](https://github.com/HasiniWijerathna)
