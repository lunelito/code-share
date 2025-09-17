import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const snippetts = await db.snippet.findMany();

  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <h1 className="m-5 text-4xl">Code snippets:</h1>
        <div className="flex  items-center flex-wrap">
          {snippetts.map((el, i) => (
            <Link
              key={i}
              href={`/snippets/${el.id}`}
              className="m-5 w-[10vw] hover:scale-105 transition ease-in-out border-2 flex flex-col justify-center items-center p-2 rounded-lg"
            >
              <p>{el.title} </p>
              <p>{el.code} </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}