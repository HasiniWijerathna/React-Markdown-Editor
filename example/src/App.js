import React, { Component } from "react";

import ReactMarkdownEditor from "react-edit-it";

export default class App extends Component {
  onChangeContent = props => {
    console.log("props" + props);
  };
  render() {
    return (
      <div>
        <ReactMarkdownEditor
          content="demo"
          onChangeContent={this.onChangeContent}
        />
      </div>
    );
  }
}
