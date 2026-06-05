import { NextResponse } from "next/server";
import { appendSheetEntry, isGoogleSheetsConfigured } from "@/lib/google-sheets";
import { validateRequestAccessPayload } from "@/lib/request-access";

export async function POST(req: Request) {
  try {
    if (!isGoogleSheetsConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Request access is not configured yet. Please contact the site administrator.",
        },
        { status: 503 }
      );
    }

    const body = await req.json();
    const validation = validateRequestAccessPayload(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    await appendSheetEntry(validation.data);

    return NextResponse.json({
      success: true,
      message: "Your request has been submitted successfully.",
    });
  } catch (error) {
    console.error("Request access error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to submit request";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
