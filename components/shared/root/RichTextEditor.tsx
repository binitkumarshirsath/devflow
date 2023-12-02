import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";
import React, { useRef } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  onBlur: () => void;
  initialValue: string;
}

const RichTextEditor = ({
  onBlur,
  onChange,
  value,
  initialValue,
}: RichTextEditorProps) => {
  const editorRef = useRef(null);

  const { theme } = useTheme();
  return (
    <Editor
      onEditorChange={onChange}
      onBlur={onBlur}
      value={value}
      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
      // @ts-ignore
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={initialValue}
      init={{
        height: 400,
        menubar: false,
        plugins: [
          "codesample",
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor " +
          " | codesample  | " +
          "alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style: `body { font-family:Inter,Arial,sans-serif; font-size:16px; }`,
        skin: theme === "dark" ? "oxide-dark" : "oxide",
        content_css: theme === "dark" ? "dark" : "light",
      }}
    />
  );
};

export default RichTextEditor;
