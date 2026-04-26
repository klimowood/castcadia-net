import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/lib/admin-auth";

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  const supabase = getAdminClient();
  const { data, error } = await supabase.from("site_settings").select("*").limit(1).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const supabase = getAdminClient();
  const body = await req.json();
  const { id, ...updates } = body;
  const { data, error } = await supabase.from("site_settings").update(updates).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
