import { describe, expect, test } from "bun:test";

import { generateErrorMailLink } from "@/lib/utils/error";

describe("generateErrorMailLink", () => {
  test("should return a valid mailto link", () => {
    const link = generateErrorMailLink({
      recipient: "test@example.com",
      subject: "Test Subject",
      body: "Test Body",
    });
    expect(link).toBe("mailto:test@example.com?subject=Test%20Subject&body=Test%20Body");
  });
});
