import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/lib/admin-auth";

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === process.env.ADMIN_PASSWORD;
}

export async function POST(req: Request) {
  if (!(await checkAuth()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) || "guides";

  if (!file)
    return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeName = file.name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    .toLowerCase();
  const path = `${folder}/${safeName}-${Date.now()}.${ext}`;

  const supabase = getAdminClient();
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from("images")
    .upload(path, buffer, { contentType: file.type, upsert: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: urlData } = supabase.storage.from("images").getPublicUrl(path);

  return NextResponse.json({ url: urlData.publicUrl });
}
