"use client";
import { cn } from "@/lib/utils";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditorMethods,
  codeBlockPlugin,
  codeMirrorPlugin,
  toolbarPlugin,
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  InsertCodeBlock,
  InsertSandpack,
  ShowSandpackInfo,
  UndoRedo,
  BoldItalicUnderlineToggles,
  InsertThematicBreak,
  InsertImage,
  InsertTable,
  CreateLink,
  ListsToggle,
  linkPlugin,
  imagePlugin,
  tablePlugin,
  linkDialogPlugin,
  diffSourcePlugin,
  BlockTypeSelect,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css"; // 1. Import default styles
import { ForwardedRef } from "react";
interface Props {
  editorRef: ForwardedRef<MDXEditorMethods> | null;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}
function Editor({ editorRef, value, onChange, placeholder, ...props }: Props) {
  return (
    <div className="background-light800_dark200 light-border-2 markdown-editor dark-editor w-full border prose prose-sm dark:prose-invert">
      <MDXEditor
        ref={editorRef}
        markdown={value} // Pass the initial value
        onChange={onChange}
        placeholder={placeholder}
        contentEditableClassName="outline-none min-h-[200px] max-w-none text-foreground grid"
        plugins={[
          // 5. Add the features you want
          headingsPlugin(),
          listsPlugin(),
          linkDialogPlugin(),
          linkPlugin(),
          imagePlugin(),
          tablePlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              css: "CSS",
              html: "HTML",
              txt: "",
            },
            // codeMirrorExtensions:theme
          }),
          diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
          toolbarPlugin({
            toolbarContents: () => (
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },

                  {
                    fallback: () => (
                      <>
                        <BoldItalicUnderlineToggles />
                        <InsertThematicBreak />
                        <InsertImage />
                        <InsertTable />
                        <CreateLink />
                        <ListsToggle />
                        <UndoRedo />
                        <InsertCodeBlock />
                        <BlockTypeSelect />
                      </>
                    ),
                  },
                ]}
              />
            ),
          }),
        ]}
        {...props}
      />
    </div>
  );
}

export default Editor;
