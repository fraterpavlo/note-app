import {
  Editor,
  EditorState,
  CompositeDecorator,
  ContentBlock,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { useRef, useState } from "react";
import { ILHashTagEditorProps } from "./HashTagEditor.model";
import "./style.scss";

const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;

const HashtagSpan = ({ children }: { children: React.ReactNode }) => {
  return <b className="hashtag-editor__tag">{children}</b>;
};

function findWithRegex(
  HashTagRegex: RegExp,
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
) {
  const text = contentBlock.getText();

  const matches = [...text.matchAll(HashTagRegex)];
  matches.forEach((match) =>
    callback(match.index!, match.index! + match[0].length)
  );
}

function hashtagStrategy(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

const createDecorator = () =>
  new CompositeDecorator([
    {
      strategy: hashtagStrategy,
      component: HashtagSpan,
    },
  ]);

function HashTagEditor({
  placeholder = "",
  classNames,
  initialValue = "",
  readOnly = false,
  onChangeCallBack,
}: ILHashTagEditorProps) {
  const contentDataState = ContentState.createFromBlockArray(
    convertFromHTML(initialValue).contentBlocks
  );
  const editorDataState = EditorState.createWithContent(
    contentDataState,
    createDecorator()
  );
  const editor = useRef<Editor | null>(null);
  // const [editorState, setEditorState] = useState(
  //   EditorState.createEmpty(createDecorator())
  // );
  const [hasFocus, setHasFocus] = useState(false);
  const [editorState, setEditorState] = useState(editorDataState);

  function focusEditor() {
    editor.current?.focus();
  }

  function onChange(editorState: EditorState) {
    setEditorState(editorState);
    const editorValue = editorState.getCurrentContent().getPlainText("\u0001");

    if (onChangeCallBack) onChangeCallBack(editorValue);
  }

  // const clearEditor = () => {
  //   const contentState = ContentState.createFromText('');
  //   const editorState = EditorState.createWithContent(contentState);
  //   setEditorState(editorState);
  // };

  return (
    <div
      onClick={focusEditor}
      className={`hashtag-editor ${classNames} ${hasFocus ? "hasFocus" : ""}`}
    >
      <Editor
        // placeholder={` ${hasFocus ? "" : placeholder}`}
        readOnly={readOnly}
        placeholder={placeholder}
        ref={editor}
        editorState={editorState}
        onChange={(editorState) => onChange(editorState)} //!e,hfnm crj,rb
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      />
    </div>
  );
}

export default HashTagEditor;
