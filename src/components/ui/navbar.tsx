import { cookies } from "next/headers";
import { NavbarContent } from "./navbar-content";

export async function Navbar() {
 const cookieStore = await cookies();
 const isNsfw = cookieStore.get("settings_nsfw")?.value === "true";

 return <NavbarContent isNsfw={isNsfw} />;
}
