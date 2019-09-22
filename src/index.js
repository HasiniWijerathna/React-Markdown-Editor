import React, { Component } from "react";
import PropTypes from "prop-types";
import MarkdownEditor from "./components/MarkdownEditor";

export default class ReactMarkdownEditor extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  onChangeContent = event => {};

  render() {
    let onChangeContent = this.onChangeContent;
    let content = "";
    this.props.onChangeContent
      ? (onChangeContent = this.props.onChangeContent)
      : (onChangeContent = this.onChangeContent);
    this.props.content ? (content = this.props.content) : "";

    return (
      <div>
        <MarkdownEditor content={content} onChangeContent={onChangeContent} />
      </div>
    );
  }
}
