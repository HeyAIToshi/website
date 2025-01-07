import { auth } from "@/server/auth";
import { UserButtonClient } from "./user-button-client";

export async function UserButton() {
  const session = await auth();
  return <UserButtonClient user={session?.user ?? null} />
}
