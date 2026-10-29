import test from "node:test";
import assert from "node:assert/strict";
import { getNextWallpaperOptions, searchWallpapers } from "../src/lib/wallhaven.ts";

const meta = { current_page: 2, last_page: 4, per_page: 24, total: 96 };
const responseData = { data: [], meta };

test("next-page warming preserves filters and the API's random seed", () => {
  const options = {
    query: "space",
    page: 2,
    sort: "random",
    purity: "100",
    categories: "010",
    atleast: "1080x1920",
    ratios: "9x16",
    colors: "0066cc",
  };
  const next = getNextWallpaperOptions(options, { ...meta, seed: "Ab12Xy" });
  assert.deepEqual(next, { ...options, page: 3, seed: "Ab12Xy" });
  assert.equal(options.page, 2);
  assert.equal(getNextWallpaperOptions(options, meta), null);
  assert.equal(getNextWallpaperOptions(options, { ...meta, current_page: 4 }), null);
});

test("a click shares an in-flight prefetch instead of making a duplicate API call", async (t) => {
  let release;
  const ready = new Promise((resolve) => { release = resolve; });
  const fetchMock = t.mock.method(globalThis, "fetch", async () => {
    await ready;
    return Response.json(responseData);
  });
  const options = { query: "concurrent-prefetch-check", page: 3 };
  const prefetch = searchWallpapers(options);
  const navigation = searchWallpapers({ ...options });
  assert.equal(fetchMock.mock.callCount(), 1);
  release();
  const results = await Promise.all([prefetch, navigation]);
  assert.deepEqual(results, [responseData, responseData]);
});

test("failed background requests are cleared so navigation can retry", async (t) => {
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    if (++calls === 1) return new Response("Unavailable", { status: 502 });
    return Response.json(responseData);
  });
  const options = { query: "failed-prefetch-check", page: 3 };
  await assert.rejects(searchWallpapers(options), /502/);
  assert.deepEqual(await searchWallpapers(options), responseData);
  assert.equal(calls, 2);
});
