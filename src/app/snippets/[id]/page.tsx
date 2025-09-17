import * as actions from "@/actions";
import { db } from "@/db";
import { notFound } from "next/navigation";
import Link from "next/link";

type SnippetShowPageType = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SnippetShowPage(props: SnippetShowPageType) {
  const { id } = await props.params;

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  const deleteSnippetAction = actions.deleteSnippet.bind(null, parseInt(id))

  if (!snippet) {
    return notFound();
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <div className="flex m-4 justify-between items-center">
          <h1 className="text-xl font-bold">{snippet?.title}</h1>
          <div className="flex gap-4">
            <Link
              href={`/snippets/${snippet.id}/edit`}
              className="w-30 p-2 border-2 rounded-lg hover:scale-105 transition ease-in-out"
            >
              Edit
            </Link>
            <form action={deleteSnippetAction}>
              <button className="w-33 p-2 border-2 rounded-lg hover:scale-105 transition ease-in-out">
                Delete
              </button>
            </form>
          </div>
        </div>
        <pre className="p-3 bg-gray-200 rounded-lg">
          <code>{snippet.code}</code>
        </pre>
      </div>
    </div>
  );
}
