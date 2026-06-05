import { NextResponse } from "next/server";
import { appendSheetEntry, isGoogleSheetsConfigured } from "@/lib/google-sheets";
import { validateSheetEntryPayload } from "@/lib/sheet-entry";

export async function POST(request: Request) {
  try {
    if (!isGoogleSheetsConfigured()) {
      return NextResponse.json(
        {
          error:
            "Google Sheets is not configured. Add credentials to your environment variables.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const validation = validateSheetEntryPayload(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    await appendSheetEntry(validation.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sheet entry error:", error);

    return NextResponse.json(
      { error: "Unable to save this entry to Google Sheets. Please try again." },
      { status: 500 }
    );
  }
}
