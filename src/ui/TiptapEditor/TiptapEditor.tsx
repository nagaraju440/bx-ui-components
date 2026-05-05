"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import { NodeSelection, TextSelection } from "@tiptap/pm/state";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import { TipTapToolbar } from "../TipTapToolbar";
import CharacterCount from "@tiptap/extension-character-count";
import { useEffect, useRef, useState } from "react";
import { FontSize } from "../TiptapExtensions/font-size";
import Image from "@tiptap/extension-image";

interface ITipTapEditorProps {
  onChange: (content: string) => void;
  content: string;
  /**
   * It is a boolean which allows us to edit the content or not
   */
  isEditable?: boolean;

  /**
   * It is the limit for characters of the text editor
   */
  characterLimit?: number;
}

const TipTapEditor = ({
  onChange,
  content,
  isEditable = true,
  characterLimit,
}: ITipTapEditorProps) => {
  const handleChange = (newContent: string) => {
    onChange && onChange(newContent);
  };

  const [showSourceCode, setShowSourceCode] = useState(false);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const preservedMarksRef = useRef<any[]>([]);
  const editorRef = useRef<Editor | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CharacterCount.configure({
        limit: characterLimit,
      }),
      Underline,
      Image,
      TextStyle,
      FontSize,
      Color.configure({
        types: ["textStyle"],
      }),
      Link.extend({
        inclusive: false,
      }).configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    editable: isEditable,
    content: content,
    editorProps: {
      attributes: {
        class:
          "px-4 py-3 border-b border-r border-l border-gray-700 text-[18px] w-full !min-h-[300px] gap-3 pt-4 rounded-bl-md rounded-br-md outline-none break-all",
      },
      handlePaste(view, event) {
        const text = event.clipboardData?.getData("text/plain");
        if (!text?.startsWith("http")) return false;

        const { state, dispatch } = view;
        const { tr, schema } = state;
        const { from } = state.selection;

        const currentMarks = state.selection.$anchor.marks();
        const storedMarks = state.storedMarks;
        const allMarks = storedMarks ?? currentMarks;
        const textStyleMark = allMarks.find(
          (m: any) => m.type.name === "textStyle"
        );

        const linkMark = schema.marks.link.create({
          href: text,
          target: "_blank",
        });

        const marks = textStyleMark
          ? [linkMark, schema.marks.textStyle.create(textStyleMark.attrs)]
          : [linkMark];

        const textNode = schema.text(text, marks);
        dispatch(tr.insert(from, textNode));
        return true;
      },
      handleClick(view, pos) {
        const nodeAtPos = view.state.doc.nodeAt(pos);
        const nodeAtPrev = pos > 0 ? view.state.doc.nodeAt(pos - 1) : null;
        const isImage =
          nodeAtPos?.type.name === "image" || nodeAtPrev?.type.name === "image";

        if (isImage) {
          const imagePos = nodeAtPos?.type.name === "image" ? pos : pos - 1;
          view.dispatch(
            view.state.tr.setSelection(
              NodeSelection.create(view.state.doc, imagePos)
            )
          );
          return true;
        }
        return false;
      },
      handleKeyDown(view, event) {
        const { selection } = view.state;
        if (
          selection instanceof NodeSelection &&
          selection.node.type.name === "image"
        ) {
          if (event.key === "Backspace" || event.key === "Delete") {
            return false;
          }
          const endPos = selection.to;
          if (endPos < view.state.doc.content.size) {
            const resolvedPos = view.state.doc.resolve(endPos);
            view.dispatch(
              view.state.tr.setSelection(TextSelection.near(resolvedPos, 1))
            );
          }
          if (preservedMarksRef.current.length > 0) {
            const chain = editorRef.current?.chain().focus();
            if (chain) {
              for (const mark of preservedMarksRef.current) {
                chain.setMark(mark.type.name, mark.attrs);
              }
              chain.run();
            }
          }
          return false;
        }
      },
    },

    onCreate({ editor }: { editor: Editor }) {
      editorRef.current = editor;
      editor.commands.focus("end");
    },

    onSelectionUpdate({ editor }: { editor: Editor }) {
      const { selection } = editor.state;
      if (
        selection instanceof NodeSelection &&
        selection.node.type.name === "image"
      ) {
        return;
      }

      const marks = selection.$anchor.marks();
      const textStyleMarks = marks.filter(
        (mark: any) => mark.type.name === "textStyle"
      );
      if (textStyleMarks.length > 0) {
        preservedMarksRef.current = textStyleMarks;
      }
    },

    onUpdate: ({ editor }: { editor: Editor }) => {
      const { doc, schema } = editor.state;
      if (doc.lastChild?.type.name === "image") {
        const transaction = editor.state.tr.insert(
          doc.content.size,
          schema.nodes.paragraph.create()
        );
        editor.view.dispatch(transaction);
        return;
      }

      const { $anchor } = editor.state.selection;
      const isEmptyParagraph =
        $anchor.parent.type.name === "paragraph" &&
        $anchor.parent.content.size === 0;

      if (isEmptyParagraph && preservedMarksRef.current.length > 0) {
        const chain = editor.chain().focus();
        for (const mark of preservedMarksRef.current) {
          chain.setMark(mark.type.name, mark.attrs);
        }
        chain.run();
      }

      const updatedContent = editor.getHTML();
      setHtmlContent(updatedContent);
      handleChange(updatedContent);
    },
  });

  useEffect(() => {
    if (!editor) return;

    const current = editor.getHTML();
    if (current !== content) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  return (
    <div className="max-h-[500px] w-full space-y-5 bg-white">
      {/* If the Editor is not editable then we need not to show the toolbar */}
      {isEditable && editor && (
        <>
          <TipTapToolbar
            editor={editor as Editor}
            showSourceCode={showSourceCode}
            setShowSourceCode={setShowSourceCode}
            htmlContent={htmlContent}
            setHtmlContent={setHtmlContent}
          />
        </>
      )}

      {/* When the source is clicked,we show the source code in the textarea else we will show the editor */}
      {showSourceCode ? (
        <textarea
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
          style={{ fontFamily: "monospace" }}
          className="!mb-[-6px] h-[300px] w-full resize-none overflow-y-scroll rounded-2xl border border-[#D6D7D8] p-[10px]"
        />
      ) : (
        <EditorContent editor={editor} className="h-[300px]" />
      )}
    </div>
  );
};

export default TipTapEditor;
