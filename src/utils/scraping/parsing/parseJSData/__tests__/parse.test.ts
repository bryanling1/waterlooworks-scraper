import { parseJSData } from "src/utils/scraping/parsing/parseJSData/parseJSData";
import { describe, expect, test } from "vitest";

describe("parse", () => {
  test("primitives", async () => {
    const objectWithPrimitives = parseJSData(`
      {
        a: 1,
        a1: 1 + 1,
        b: "string",
        c: true,
        d: false,
        e: null
      }
    `);
    expect(objectWithPrimitives).toEqual({
      a: 1,
      a1: "1 + 1",
      b: "string",
      c: true,
      d: false,
      e: null,
    });
    expect(parseJSData("1 + 1")).toEqual("1 + 1");
    expect(parseJSData("true")).toEqual(true);
    expect(parseJSData("false")).toEqual(false);
    expect(parseJSData("null")).toEqual(null);
    expect(parseJSData("1")).toEqual(1);
    expect(parseJSData("[1, 1+1, true, false, null]")).toEqual([
      1,
      "1+1",
      true,
      false,
      null,
    ]);
  });

  test("nested object", async () => {
    const out = parseJSData(`
      {
        a: {
          b: {
            c: 'd'
          }
        }
      }
    `);
    expect(out).toEqual({
      a: {
        b: {
          c: "d",
        },
      },
    });
  });

  test("nested array", async () => {
    const out = parseJSData(`
      {
        a: [1, {name: "ted"}, [true, false, null]]
      }
    `);
    expect(out).toEqual({
      a: [1, { name: "ted" }, [true, false, null]],
    });
  });
});
