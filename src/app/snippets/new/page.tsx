import { db } from "@/db";
import { redirect } from "next/navigation";

export default function page() {
  const createSnippet = async (FormData: FormData) => {
    "use server";

    const title = FormData.get("title") as string;
    const code = FormData.get("code") as string;

    const snippet = await db.snippet.create({
      title: title,
      code: code,
    });

    console.log(snippet)

    redirect("./");
  };

  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="flex gap-4 ">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea name="code" className="border rounded p-2 w-full" />
        </div>
        <button
          type="submit"
          className="rounded p-2 bg-blue-300 hover:bg-blue-400 transition font-semibold"
        >
          Add new snippet
        </button>
      </div>
    </form>
  );
}
