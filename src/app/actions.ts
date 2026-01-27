"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function toggleNsfw(currentState: boolean) {
 const cookieStore = await cookies();
 const newState = !currentState;

 cookieStore.set("settings_nsfw", String(newState), {
  path: "/",
  maxAge: 60 * 60 * 24 * 365, // 1 year
  sameSite: "lax",
 });

 revalidatePath("/");
 revalidatePath("/search");
 revalidatePath("/popular");
 revalidatePath("/new");
}
