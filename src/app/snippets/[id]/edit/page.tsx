import React from "react";
import { db } from "@/db";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/SnippetEditForm"

interface SnipeptEditPageType {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnipeptEditPage(props: SnipeptEditPageType) {
  const { id } = await props.params;

  const snippetId = parseInt(id);
  const snippet = await db.snippet.findFirst({
    where: { id: snippetId },
  });

  if(!snippet){
    return notFound()
  }

  return <div><SnippetEditForm snippet={snippet}/></div>;
}
