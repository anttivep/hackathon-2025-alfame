import { db } from "@/db";
import { example } from "@/db/schema";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await db.query.example.findMany({});

  async function createHelloWorld(formData: FormData) {
    "use server";
    await db.insert(example).values({ text: formData.get("text") as string });
    revalidatePath("/");
  }

  return (
    <div>
      <form action={createHelloWorld}>
        <input type="text" name="text" defaultValue="Hello World" />
        <button type="submit">Create Hello World</button>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
