import React, { Component } from "react";
import styles from "./styles.css";

/**
 * Representing the preview of the updating markdown content
 */
class MarkdownPreview extends Component {
  constructor(props) {
    super(props);
  }
  
  /**
   * Handle markdown to regular text conversion
   */
  convertTextHtml = () => ({ __html: this.props.context });

  /**
   * Describes the elements on the markdown preview
   * @return {String} HTML elements
   */
  render() {
    return (
      <div
        className={styles.previewContainer}
        dangerouslySetInnerHTML={this.convertTextHtml()}
      ></div>
    );
  }
}

export default MarkdownPreview;
