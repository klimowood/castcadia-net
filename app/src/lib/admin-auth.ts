import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "castcadia_admin";

/** Check if admin session is valid. Redirects to login if not. */
export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token !== process.env.ADMIN_PASSWORD) {
    redirect("/admin-login");
  }
}

/** Verify a password attempt matches. */
export function verifyPassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD;
}

export { COOKIE_NAME };
