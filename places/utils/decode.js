import { unserialize } from "php-unserialize";
export function decodeBase64Data(data) {
  try {
    return Buffer.from(data, "base64").toString("utf-8");
  } catch (error) {
    console.error("Base64 decode error:", error);
    return data;
  }
}

export function safeUnserialize(data) {
  try {
    // Remove object type indicators that cause issues
    const cleanData = data.replace(/O:\d+:"[^"]+"/g, "a");
    return unserialize(cleanData);
  } catch (error) {
    console.error("Unserialize error:", error);
    // If unserialize fails, try parsing as JSON
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }
}
