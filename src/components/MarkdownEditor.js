import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import styles from "./styles.css";
import MarkdownPreview from "./MarkdownPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeading,
  faBold,
  faItalic,
  faLink,
  faList,
  faListOl,
  faImage,
  faEye
} from "@fortawesome/free-solid-svg-icons";

/**
 * Representing the markdown editor functionality
 */
class MarkdownEditor extends Component {
  /**
   * Class constructor
   * @param {Object} props User define component
   */
  constructor(props) {
    super(props);

    this.state = {
      context: props.content,
      preview: false,
      textValue: "",
      editorContext: props.content
    };

    props.onChangeContent(this.state.context);
    this.editor = React.createRef();
  }

  /**
   * Handle markdown to HTML text conversion
   * @param  {Event} changeEvent The change event of the markdown content
   */
  handleConvertText = event => {
    this.setState({
      editorContext: event.target.value
    });

    this.props.onChangeContent(this.state.editorContext);

    let md = event.target.value;
    //ul
    md = md.replace(/^\s*\n\*/gm, "<ul>\n*");
    md = md.replace(/^(\*.+)\s*\n([^\*])/gm, "$1\n</ul>\n\n$2");
    md = md.replace(/^\*(.+)/gm, "<li>$1</li>");

    //ol
    md = md.replace(/^\s*\n\d\./gm, "<ol>\n1.");
    md = md.replace(/^(\d\..+)\s*\n([^\d\.])/gm, "$1\n</ol>\n\n$2");
    md = md.replace(/^\d\.(.+)/gm, "<li>$1</li>");

    //blockquote
    md = md.replace(/^\>(.+)/gm, "<blockquote>$1</blockquote>");

    //h
    md = md.replace(/[\#]{6}(.+)/g, "<h6>$1</h6>");
    md = md.replace(/[\#]{5}(.+)/g, "<h5>$1</h5>");
    md = md.replace(/[\#]{4}(.+)/g, "<h4>$1</h4>");
    md = md.replace(/[\#]{3}(.+)/g, "<h3>$1</h3>");
    md = md.replace(/[\#]{2}(.+)/g, "<h2>$1</h2>");
    md = md.replace(/[\#]{1}(.+)/g, "<h1>$1</h1>");

    //alt h
    md = md.replace(/^(.+)\n\=+/gm, "<h1>$1</h1>");
    md = md.replace(/^(.+)\n\-+/gm, "<h2>$1</h2>");

    //images
    md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');

    //links
    md = md.replace(
      /[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g,
      '<a href="$2" title="$4">$1</a>'
    );

    //font styles
    md = md.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, "<b>$1</b>");
    md = md.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, "<i>$1</i>");
    md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, "<del>$1</del>");

    //pre
    md = md.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">');
    md = md.replace(/^\`\`\`\s*\n/gm, "</pre>\n\n");

    //code
    md = md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, "<code>$1</code>");

    //p
    md = md.replace(/^\s*(\n)?(.+)/gm, function(m) {
      return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m)
        ? m
        : "<p>" + m + "</p>";
    });

    //strip p from pre
    md = md.replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/p\>/gm, "$1$2");

    this.setState({
      context: md
    });

  };

  /**
   * Handle conversion of the header 1 title content
   */
  handleHeader1 = () => {
    this.insertText("#", "heading1", 1, 9);
  };

  /**
   * Handle conversion of the header 2 title content
   */
  handleHeader2 = () => {
    this.insertText("##", "heading2", 2, 10);
  };

  /**
   * Handle conversion of the header 3 title content
   */
  handleHeader3 = () => {
    this.insertText("###", "heading3", 3, 11);
  };

  /**
   * Handle conversion of the bold text content
   */
  handleTextBold = () => {
    this.insertText("****", "bold", 2, 6);
  };

  /**
   * Handle conversion of the italic text content
   */
  handleTextItalic = () => {
    this.insertText("**", "demo", 1, 5);
  };

  /**
   * Handle conversion of the link text content
   */
  handleTextLink = () => {
    this.insertText("[](http://...)", "url text", 1, 9);
  };

  /**
   * Handle conversion of the item text content
   */
  handleTextList = () => {
    this.insertText("* ", "item", 2, 6);
  };

  /**
   * Handle conversion of the list item text content
   */
  handleTextOl = () => {
    this.insertText("1. ", "item", 3, 7);
  };

  /**
   * Handle conversion of the image url content
   */
  handleInsertImage = () => {
    this.insertText("![](http://)", "url", 1, 4);
  };

  /**
   * Handle changing editor to preview
   */
  handlePreview = () => {
    this.setState({ preview: !this.state.preview });
  };

  /**
  * Updated the text area adding the formatting according to the change event of the editor button click
    @param  {Text} syntax             The syntax value of the formatting
    @param  {Text} placeholder        The placeholder value defining the formatting
    @param  {Integer} selectionStart  The start value of the text selection
    @param  {Integer} selectionStart  The end value of the text selection
  */

  insertText = (
    syntax,
    placeholder = "demo",
    selectionStart = 0,
    selectionEnd = 0
  ) => {
    // Current Selection
    const currentSelectionStart = this.editor.current.selectionStart;
    const currentSelectionEnd = this.editor.current.selectionEnd;
    const currentText = this.editor.current.value;
    let textarea = this.editor.current;

    if (currentSelectionStart === currentSelectionEnd) {
      const textWithSyntax = (textarea.value =
        currentText.substring(0, currentSelectionStart) +
        syntax +
        currentText.substring(currentSelectionEnd));
      textarea.value =
        textWithSyntax.substring(0, currentSelectionStart + selectionStart) +
        placeholder +
        textWithSyntax.substring(currentSelectionStart + selectionStart);

      textarea.focus();
      textarea.selectionStart = currentSelectionStart + selectionStart;
      textarea.selectionEnd = currentSelectionEnd + selectionEnd;
    } else {
      const selectedText = currentText.substring(
        currentSelectionStart,
        currentSelectionEnd
      );
      const withoutSelection =
        currentText.substring(0, currentSelectionStart) +
        currentText.substring(currentSelectionEnd);
      const textWithSyntax =
        withoutSelection.substring(0, currentSelectionStart) +
        syntax +
        withoutSelection.substring(currentSelectionStart);

      // Surround selected text
      textarea.value =
        textWithSyntax.substring(0, currentSelectionStart + selectionStart) +
        selectedText +
        textWithSyntax.substring(currentSelectionStart + selectionStart);

      textarea.focus();
      textarea.selectionEnd =
        currentSelectionEnd + selectionStart + selectedText.length;
    }
  };

  /**
   * Describes the elements on the markdown editor
   * @return {String} HTML elements
   */
  render() {
    let content = (
      <div>
        {" "}
        <div className={styles.mkcontainer}>
          <div className={styles.mktoolbar}>
            <div className={styles.mkgroup}>
              <button className={styles.button} onClick={this.handleHeader1}>
                {" "}
                <FontAwesomeIcon icon={faHeading} />1
              </button>
              <button className={styles.button} onClick={this.handleHeader2}>
                {" "}
                <FontAwesomeIcon icon={faHeading} />2
              </button>
              <button className={styles.button} onClick={this.handleHeader3}>
                {" "}
                <FontAwesomeIcon icon={faHeading} />3
              </button>
            </div>

            <div className={styles.mkgroup}>
              <button className={styles.button} onClick={this.handleTextBold}>
                {" "}
                <FontAwesomeIcon icon={faBold} />
              </button>

              <button className={styles.button} onClick={this.handleTextItalic}>
                {" "}
                <FontAwesomeIcon icon={faItalic} />
              </button>
            </div>

            <div className={styles.mkgroup}>
              <button className={styles.button} onClick={this.handleTextLink}>
                {" "}
                <FontAwesomeIcon icon={faLink} />
              </button>

              <button className={styles.button} onClick={this.handleTextList}>
                {" "}
                <FontAwesomeIcon icon={faList} />
              </button>

              <button className={styles.button} onClick={this.handleTextOl}>
                {" "}
                <FontAwesomeIcon icon={faListOl} />
              </button>
              <button
                className={styles.button}
                onClick={this.handleInsertImage}
              >
                {" "}
                <FontAwesomeIcon icon={faImage} />
              </button>
            </div>
            <button className={styles.button} onClick={this.handlePreview}>
              {" "}
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>

          <div id="input-output">
            <textarea
              className={styles.textContainer}
              rows="20"
              cols="90"
              ref={this.editor}
              value={this.state.editorContext}
              onChange={this.handleConvertText}
            ></textarea>
          </div>
        </div>
      </div>
    );
    if (this.state.preview) {
      content = (
        <div>
          <div className={styles.mkcontainer}>
            <div className={styles.mktoolbar}>
              <div className={styles.mkgroup}>
                <button className={styles.viewButton} >
                  {" "}
                  <FontAwesomeIcon icon={faHeading} />1
                </button>
                <button className={styles.viewButton}>
                  {" "}
                  <FontAwesomeIcon icon={faHeading} />2
                </button>
                <button className={styles.viewButton}>
                  {" "}
                  <FontAwesomeIcon icon={faHeading} />3
                </button>
              </div>

              <div className={styles.mkgroup}>
                <button className={styles.viewButton}>
                  {" "}
                  <FontAwesomeIcon icon={faBold} />
                </button>
                <button className={styles.viewButton}>
                  {" "}
                  <FontAwesomeIcon icon={faItalic} />
                </button>
              </div>

              <div className={styles.mkgroup}>
                <button className={styles.viewButton}>
                  {" "}
                  <FontAwesomeIcon icon={faLink} />
                </button>
                <button className={styles.viewButton}>
                  {" "}
                  <FontAwesomeIcon icon={faList} />
                </button>
                <button className={styles.viewButton}>
                  {" "}
                  <FontAwesomeIcon icon={faListOl} />
                </button>
                <button className={styles.viewButton} >
                  {" "}
                  <FontAwesomeIcon icon={faImage} />
                </button>
              </div>
              <button className={styles.previewButton} onClick={this.handlePreview}>
                {" "}
                <FontAwesomeIcon icon={faEye} />
              </button>
            </div>

            <div>
              <MarkdownPreview context={this.state.context} />
            </div>
          </div>
        </div>
      );
    }
    return <div> {content}</div>;
  }
}

export default MarkdownEditor;
