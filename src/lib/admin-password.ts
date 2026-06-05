import { timingSafeEqual } from "crypto";

export function verifyAdminPassword(password: string): boolean {
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredPassword) {
    return false;
  }

  try {
    const inputBuffer = Buffer.from(password);
    const configuredBuffer = Buffer.from(configuredPassword);

    if (inputBuffer.length !== configuredBuffer.length) {
      return false;
    }

    return timingSafeEqual(inputBuffer, configuredBuffer);
  } catch {
    return false;
  }
}
