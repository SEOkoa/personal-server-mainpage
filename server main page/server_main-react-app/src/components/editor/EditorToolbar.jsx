import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND } from 'lexical';

const EditorToolbar = () => {
  const [editor] = useLexicalComposerContext();

  const formatBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  };

  const formatItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
  };

  const formatUnderline = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
  };

  return (
    <div className="editor-toolbar">
      <button 
        onClick={formatBold} 
        className="toolbar-button"
        title="굵게"
      >
        <span className="material-icons" style={{ color: '#333' }}>format_bold</span>
      </button>
      <button 
        onClick={formatItalic} 
        className="toolbar-button"
        title="기울임"
      >
        <span className="material-icons" style={{ color: '#333' }}>format_italic</span>
      </button>
      <button 
        onClick={formatUnderline} 
        className="toolbar-button"
        title="밑줄"
      >
        <span className="material-icons" style={{ color: '#333' }}>format_underlined</span>
      </button>
    </div>
  );
};

export default EditorToolbar; 