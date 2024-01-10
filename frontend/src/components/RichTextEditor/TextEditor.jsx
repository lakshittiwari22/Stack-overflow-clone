import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faCode,
  faFileCode,
  faFilm,
  faImage,
  faItalic,
  faLink,
  faList,
  faListOl,
  faQuoteRight,
  faStrikethrough,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import "./textEditor.css";

const TextEditor = ({ onContentChange }) => {
  const [content, setContent] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikeThrough, setStrikeThrough] = useState(false);
  const [isBlockquote, setIsBlockquote] = useState(false);
  const [isHeading1, setIsHeading1] = useState(false);
  const [isHeading2, setIsHeading2] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [isInlineCode, setIsInlineCode] = useState(false);
  const [isCodeBlock, setIsCodeBlock] = useState(false);
  const textEditorRef = useRef();

  useEffect(() => {
    const handlePaste = (e) => {
      e.preventDefault();

      const text = e.clipboardData.getData("text/plain");

      // Check if the pasted content represents a code block
      const isCodeBlock = text.trim().split("\n").length > 1;

      if (isCodeBlock) {
        const codeElement = document.createElement("pre");
        codeElement.appendChild(document.createTextNode(text));
        document.execCommand("insertHTML", false, codeElement.outerHTML);
      } else {
        document.execCommand("insertText", false, text);
      }
    };

    const textEditor = textEditorRef.current;

    textEditor.addEventListener("paste", handlePaste);

    return () => {
      textEditor.removeEventListener("paste", handlePaste);
    };
  }, []);

  const handleFormat = (style, value = null) => {
    // Toggle the state for the corresponding style

    switch (style) {
      case "bold":
        setIsBold(!isBold);
        break;
      case "italic":
        setIsItalic(!isItalic);
        break;
      case "underline":
        setIsUnderline(!isUnderline);
        break;
      case "strikeThrough":
        setStrikeThrough(!isStrikeThrough);
        break;
      case "formatBlock":
        // Handle specific cases for formatBlock
        if (value === "<blockquote>") {
          setIsBlockquote(!isBlockquote);
          value = isBlockquote ? "<p>" : "<blockquote>";
        } else if (value === "<h1>") {
          setIsHeading1(!isHeading1);
          value = isHeading1 ? "<p>" : "<h1>";
        } else if (value === "<h2>") {
          setIsHeading2(!isHeading2);
          value = isHeading2 ? "<p>" : "<h2>";
        } else if (value === "<pre>") {
          setIsCodeBlock(!isCodeBlock);
          value = isCodeBlock ? "<p>" : "<pre>";
        }
        break;
      case "insertOrderedList":
        setIsOrderedList(!isOrderedList);
        break;
      case "insertUnorderedList":
        setIsUnorderedList(!isUnorderedList);
        break;

      case "code":
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const commonAncestor = range.commonAncestorContainer;

          // Check if the selection is completely inside a <code> element
          const isInsideCode =
            commonAncestor.tagName === "CODE" ||
            commonAncestor.parentNode.tagName === "CODE";

          if (isInsideCode) {
            // If already in <code>, unwrap the selection from <code> tags
            const textNode = document.createTextNode(selection.toString());
            range.deleteContents();
            range.insertNode(textNode);
            setIsInlineCode(false);
          } else {
            // If not, wrap the selection in <code> tags
            const codeElement = document.createElement("code");
            codeElement.appendChild(
              document.createTextNode(selection.toString())
            );
            range.deleteContents();
            range.insertNode(codeElement);
            setIsInlineCode(true);
          }
        }
        break;

      case "insertHTML":
        if (value === "video") {
          const videoUrl = prompt("Enter video URL:");
          if (videoUrl) {
            const embedCode = `<iframe width="560" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
            document.execCommand(style, false, embedCode);
          }
        }
        break;

      default:
        break;
    }

    // Check the current state before applying the style
    document.execCommand(style, false, value);

    // Set focus after the command is executed
    textEditorRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.code === "Enter") {
      e.preventDefault();

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      // Check if inline code or code block is active
      const isInlineCode = range.commonAncestorContainer.tagName === "CODE";
      const isCodeBlock = range.commonAncestorContainer.tagName === "PRE";

      if (isInlineCode || isCodeBlock) {
        // If inline code or code block is active, insert a line break
        document.execCommand("insertHTML", false, "<br>");
      } else {
        // If no formatting is active, create a new paragraph
        document.execCommand("insertParagraph");
      }
    }
  };

  const handleInsertImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target.result;
          document.execCommand("insertImage", false, base64);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleInsertVideo = () => {
    const videoUrl = prompt("Enter video URL:");
  
    if (videoUrl) {
      // Validate that the entered URL is from YouTube
      if (videoUrl.includes("youtube.com")) {
        const videoId = new URL(videoUrl).searchParams.get("v");
        if (videoId) {
          const embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
          document.execCommand("insertHTML", false, embedCode);
        } else {
          alert("Invalid YouTube video URL");
        }
      } else {
        alert("Please enter a valid YouTube video URL");
      }
    }
  };

  const handleCreateLink = () => {
    const selection = window.getSelection();
    const currentLink = document.queryCommandValue("createLink");
  
    let url = "";
    if (currentLink) {
      // If there is a link already, get its URL
      url = currentLink;
    } else {
      // If no link is selected, prompt for the URL
      url = prompt("Enter link URL:", "http://");
    }
  
    if (url !== null) {
      // Create the link with the selected text or prompt for text
      const linkText = selection.toString() || prompt("Enter link text:", "");
  
      if (linkText !== null) {
        const linkHTML = `<a href="${url}" target="_blank">${linkText}</a>`;
        document.execCommand("insertHTML", false, linkHTML);
      }
    }
  };
  const handleInput = (e) => {
    const newContent = e.target.innerHTML;
    setContent(newContent);

    // Check for Enter key
    if (e.key === "Enter") {
      e.preventDefault();

      // If code block is active, insert a line break instead of creating a new pair of tags
      if (isCodeBlock) {
        document.execCommand("insertHTML", false, "<br>");
      } else {
        // Otherwise, let the default behavior (create a new paragraph) occur
        document.execCommand("insertParagraph");
      }
    }

    e.target.focus();
    // Notify the parent component about the content change
    onContentChange(newContent);
  };
  return (
    <div className="editor">
      <div className="toolbar">
        <button
          type="button"
          className={`editor-btn ${isBold ? "selected" : ""}`}
          onClick={() => handleFormat("bold")}
        >
          <FontAwesomeIcon icon={faBold} />
        </button>

        <button
          type="button"
          className={`editor-btn ${isUnderline ? "selected" : ""}`}
          onClick={() => handleFormat("underline")}
        >
          <FontAwesomeIcon icon={faUnderline} />
        </button>

        <button
          type="button"
          className={`editor-btn ${isItalic ? "selected" : ""}`}
          onClick={() => handleFormat("italic")}
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>

        <button
          type="button"
          className={`editor-btn ${isStrikeThrough ? "selected" : ""}`}
          onClick={() => handleFormat("strikeThrough")}
        >
          <FontAwesomeIcon icon={faStrikethrough} />
        </button>

        <button
          type="button"
          className={`editor-btn ${isBlockquote ? "selected" : ""}`}
          onClick={() => handleFormat("formatBlock", "<blockquote>")}
        >
          <FontAwesomeIcon icon={faQuoteRight} />
        </button>

        <button
          type="button"
          className={`editor-btn ${isHeading1 ? "selected" : ""}`}
          style={{ fontWeight: "bold" }}
          onClick={() => handleFormat("formatBlock", "<h1>")}
        >
          H1
        </button>

        <button
          type="button"
          className={`editor-btn ${isHeading2 ? "selected" : ""}`}
          style={{ fontWeight: "bold" }}
          onClick={() => handleFormat("formatBlock", "<h2>")}
        >
          H2
        </button>

        <button
          type="button"
          className={`editor-btn ${isUnorderedList ? "selected" : ""}`}
          onClick={() => handleFormat("insertUnorderedList")}
        >
          <FontAwesomeIcon icon={faList} />
        </button>

        <button
          type="button"
          className={`editor-btn ${isOrderedList ? "selected" : ""}`}
          onClick={() => handleFormat("insertOrderedList")}
        >
          <FontAwesomeIcon icon={faListOl} />
        </button>

        <button
          type="button"
          className={`editor-btn ${isInlineCode ? "selected" : ""}`}
          onClick={() => handleFormat("code")}
        >
          <FontAwesomeIcon icon={faCode} />
        </button>

        <button
          type="button"
          className={`editor-btn ${isCodeBlock ? "selected" : ""}`}
          onClick={() => handleFormat("formatBlock", "<pre>")}
        >
          <FontAwesomeIcon icon={faFileCode} />
        </button>

        <button type="button" className="editor-btn" onClick={handleCreateLink}>
          <FontAwesomeIcon icon={faLink} />
        </button>
        <button
          type="button"
          className="editor-btn"
          onClick={handleInsertImage}
        >
          <FontAwesomeIcon icon={faImage} />
        </button>

        <button
          type="button"
          className="editor-btn"
          onClick={handleInsertVideo}
        >
          <FontAwesomeIcon icon={faFilm} />
        </button>
      </div>
      <div
        className="text-editor"
        contentEditable="true"
        dir="ltr"
        ref={textEditorRef}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />
      
    </div>
  );
};

export default TextEditor;
