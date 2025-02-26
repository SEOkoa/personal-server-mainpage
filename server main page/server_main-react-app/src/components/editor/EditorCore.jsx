import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import EditorToolbar from './EditorToolbar';

// 에디터 내용 변경 감지 컴포넌트
function EditorOnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();
  
  return (
    <OnChangePlugin
      onChange={editorState => {
        editorState.read(() => {
          const textContent = editor.getEditorState().read(() => {
            return editor.getRootElement().textContent;
          });
          onChange(textContent);
        });
      }}
    />
  );
}

const EditorCore = ({ 
  namespace, 
  onChange, 
  placeholder = "내용을 입력하세요...",
  children 
}) => {
  // 에디터 초기 설정
  const initialConfig = {
    namespace,
    theme: {
      root: 'editor-input',
      text: {
        bold: 'editor-bold',
        italic: 'editor-italic',
        underline: 'editor-underline',
      },
      placeholder: 'editor-placeholder',
    },
    onError: (error) => console.error(error),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <EditorToolbar />
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<div className="editor-placeholder">{placeholder}</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <EditorOnChangePlugin onChange={onChange} />
        {children}
      </div>
    </LexicalComposer>
  );
};

export default EditorCore; 