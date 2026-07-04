import { describe, expect, it } from "vitest";
import {
  slugify,
  formatDate,
  estimateReadingTime,
  getWordCount,
  truncate,
  debounce,
  isBrowser,
  generateId,
  clamp,
  parseCommaSeparated,
} from "../utils";

describe("slugify", () => {
  it("should convert text to lowercase slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("should remove special characters", () => {
    expect(slugify("¿Cómo estás?")).toBe("como-estas");
  });

  it("should handle multiple spaces", () => {
    expect(slugify("hello   world")).toBe("hello-world");
  });

  it("should remove leading and trailing dashes", () => {
    expect(slugify("  hello world  ")).toBe("hello-world");
  });

  it("should handle accented characters", () => {
    expect(slugify("Jesús María")).toBe("jesus-maria");
  });
});

describe("formatDate", () => {
  it("should format date in Spanish", () => {
    const result = formatDate("2024-06-15");
    expect(result).toContain("junio");
    expect(result).toContain("2024");
  });
});

describe("estimateReadingTime", () => {
  it("should calculate reading time based on word count", () => {
    // 220 words per minute
    expect(estimateReadingTime(220)).toBe("1 min de lectura");
    expect(estimateReadingTime(440)).toBe("2 min de lectura");
    expect(estimateReadingTime(1100)).toBe("5 min de lectura");
  });

  it("should return at least 1 minute for short content", () => {
    expect(estimateReadingTime(50)).toBe("1 min de lectura");
  });
});

describe("getWordCount", () => {
  it("should count words correctly", () => {
    expect(getWordCount("hello world")).toBe(2);
    expect(getWordCount("one two three four five")).toBe(5);
  });

  it("should handle empty strings", () => {
    expect(getWordCount("")).toBe(0);
    expect(getWordCount("   ")).toBe(0);
  });

  it("should handle multiple spaces", () => {
    expect(getWordCount("hello    world")).toBe(2);
  });
});

describe("truncate", () => {
  it("should truncate long text", () => {
    const result = truncate("This is a very long text that should be truncated", 20);
    expect(result).toBe("This is a very lo...");
    expect(result.length).toBeLessThanOrEqual(20);
  });

  it("should not truncate short text", () => {
    expect(truncate("Short", 20)).toBe("Short");
  });

  it("should handle exact length", () => {
    expect(truncate("Hello", 5)).toBe("Hello");
  });
});

describe("debounce", () => {
  it("should delay function execution", async () => {
    let callCount = 0;
    const fn = debounce(() => {
      callCount++;
    }, 100);

    fn();
    fn();
    fn();

    expect(callCount).toBe(0);

    await new Promise((resolve) => setTimeout(resolve, 150));

    expect(callCount).toBe(1);
  });
});

describe("isBrowser", () => {
  it("should return true in jsdom test environment", () => {
    expect(isBrowser()).toBe(true);
  });
});

describe("generateId", () => {
  it("should generate unique IDs", () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it("should include timestamp", () => {
    const id = generateId();
    expect(id).toMatch(/^\d+-[a-z0-9]+$/);
  });
});

describe("clamp", () => {
  it("should clamp value to min", () => {
    expect(clamp(5, 10, 20)).toBe(10);
  });

  it("should clamp value to max", () => {
    expect(clamp(25, 10, 20)).toBe(20);
  });

  it("should return value if within range", () => {
    expect(clamp(15, 10, 20)).toBe(15);
  });
});

describe("parseCommaSeparated", () => {
  it("should return array as is", () => {
    const arr = ["a", "b", "c"];
    expect(parseCommaSeparated(arr)).toEqual(arr);
  });

  it("should parse comma-separated string", () => {
    expect(parseCommaSeparated("a, b, c")).toEqual(["a", "b", "c"]);
  });

  it("should trim whitespace", () => {
    expect(parseCommaSeparated("  a  ,  b  ")).toEqual(["a", "b"]);
  });

  it("should filter empty strings", () => {
    expect(parseCommaSeparated("a, , b")).toEqual(["a", "b"]);
  });
});