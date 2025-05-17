import { db } from "@/db";
import { example } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const data = await db.query.example.findMany();

  async function createHelloWorld() {
    "use server";
    await db.insert(example).values({ text: "Hello World" });
    revalidatePath("/");
  }

  return (
    <div>
      <form action={createHelloWorld}>
        <button type="submit">Create Hello World</button>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
