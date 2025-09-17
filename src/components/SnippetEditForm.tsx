"use client";

import type { Snippet } from "@/generated/prisma";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import * as actions from "@/actions";

type SnippetEditFormType = {
  snippet: Snippet;
};

export default function SnippetEditForm({ snippet }: SnippetEditFormType) {
  const [code, setCode] = useState(snippet.code);

  const handleEditorFunction = (value: string = "") => {
    setCode(value);
  };

  const editSnippetAction = actions.editSnippet.bind(
    null,
    snippet.id,
    code
  );

  return (
    <div className="flex justify-center m-5 flex-col gap-5">
      <Editor
        height={"40vh"}
        width={"50vh"}
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        onChange={handleEditorFunction}
        options={{
          minimap: { enabled: false },
        }}
      />
      <form action={editSnippetAction}>
        <button type="submit" className="w-33 p-2 border-2 rounded-lg hover:scale-105 transition ease-in-out">save</button>
      </form>
    </div>
  );
}
