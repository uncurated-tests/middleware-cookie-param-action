import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ cookie: string }>;
}) {
  const { cookie: cookieFromParams } = await params;
  const cookieFromCookies = (await cookies()).get("my-cookie")?.value;
  return (
    <main>
      <div>Cookie from params (middleware rewrite): {cookieFromParams}</div>
      <div>Cookie from cookies(): {cookieFromCookies ?? "<no value>"}</div>
      <div>
        <form
          action={async (formData: FormData) => {
            "use server";
            const cookieValue = formData.get("cookieValue");
            if (typeof cookieValue !== "string" || !cookieValue.trim()) {
              console.error("bad cookie");
              return;
            }
            console.log("setting cookie to", cookieValue);
            const cookieStore = await cookies();
            cookieStore.set("my-cookie", cookieValue);
          }}
        >
          <input
            type="text"
            name="cookieValue"
            defaultValue={cookieFromParams}
          />
          <button type="submit">Set cookie</button>
        </form>
      </div>
      <div>
        <form
          action={async () => {
            "use server";
            const cookieStore = await cookies();
            cookieStore.delete("my-cookie");
          }}
        >
          <button type="submit">Clear cookies</button>
        </form>
      </div>
    </main>
  );
}
