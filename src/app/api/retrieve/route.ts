import { NextResponse } from "next/server";
import { createQueryStringFromDict, parseXMLData } from "@/utils/retrieveData";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const data = await request.text();

    const result = await parseXMLData(data);

    const dict = result?.plist?.dict?.[0];
    if (!dict) {
      return NextResponse.json({ error: "Malformed XML payload" }, { status: 400 });
    }

    const queryString = createQueryStringFromDict(dict);

    const url = new URL(`/success?${queryString}`, request.url);
    return NextResponse.redirect(url, 301);
  } catch (err) {
    console.error("Error parsing XML:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
