import { db } from "@/db";
import { example } from "@/db/schema";

const createHelloWorld = async () => {
  "use server";

  db.insert(example).values({ text: "Hello World" });
};

export default async function Home() {
  const data = await db.query.example.findMany();
  return (
    <div>
      Hello World
      <form action={createHelloWorld}>
        <button type="submit">Create Hello World</button>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
