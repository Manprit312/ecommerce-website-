import { NextResponse } from "next/server";

const SPACES = [
  "https://camenduru-triposr.hf.space/run/predict",
  "https://akhaliq-triposr.hf.space/run/predict",
  "https://multimodalart-triposr.hf.space/run/predict",
];

export async function POST(req: Request) {
  const { imageUrl } = await req.json();
  if (!imageUrl)
    return NextResponse.json({ error: "Missing imageUrl" }, { status: 400 });

  for (const endpoint of SPACES) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [imageUrl] }),
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({ endpoint, data });
      } else {
        const text = await res.text();
        console.warn(`⚠️ ${endpoint} failed:`, text.slice(0, 100));
      }
    } catch (err: any) {
      console.warn(`❌ ${endpoint} error:`, err.message);
    }
  }

  return NextResponse.json(
    { error: "All free TripoSR Spaces are down. Please retry later." },
    { status: 503 }
  );
}
