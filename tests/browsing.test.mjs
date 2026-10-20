import test from "node:test";
import assert from "node:assert/strict";
import { getCollectionOptions } from "../src/lib/collection-options.ts";
import { validateDownloadUrl } from "../src/lib/download.ts";

test("portrait results use a portrait minimum resolution", () => {
  assert.equal(getCollectionOptions({}, "toplist", true).atleast, "1080x1920");
  assert.equal(
    getCollectionOptions({ orientation: "portrait", resolution: "4k" }).atleast,
    "2160x3840",
  );
  assert.equal(getCollectionOptions({ resolution: "4k" }, "toplist", true).ratios, "9x16");
});
test("any resolution removes the default minimum", () => {
  assert.equal(getCollectionOptions({ resolution: "any" }).atleast, undefined);
});
test("query input and filters are normalized", () => {
  const result = getCollectionOptions({
    q: ["nature", "other"],
    sort: "invalid",
    page: "-4",
    category: "people",
    color: "0066cc",
  });
  assert.equal(result.query, "nature");
  assert.equal(result.sort, "toplist");
  assert.equal(result.page, 1);
  assert.equal(result.categories, "001");
  assert.equal(result.colors, "0066cc");
  assert.equal(
    getCollectionOptions({ color: "bad", page: "1.5", orientation: "invalid" }).ratios,
    undefined,
  );
  assert.equal(getCollectionOptions({ color: "bad" }).colors, undefined);
  assert.equal(getCollectionOptions({ page: "Infinity" }).page, 1);
  assert.equal(getCollectionOptions({ page: "999999999" }).page, 100000);
});
test("random pagination accepts valid seeds only", () => {
  assert.equal(getCollectionOptions({ seed: "Ab12Xy", sort: "random" }).seed, "Ab12Xy");
  assert.equal(getCollectionOptions({ seed: "../bad" }).seed, undefined);
});
test("downloads accept canonical Wallhaven image URLs", () => {
  assert.deepEqual(validateDownloadUrl("https://w.wallhaven.cc/full/ab/wallhaven-abc123.jpg"), {
    url: "https://w.wallhaven.cc/full/ab/wallhaven-abc123.jpg",
    filename: "lumina-abc123.jpg",
  });
});
test("downloads reject arbitrary hosts, credentials, redirects, ports, and malformed image paths", () => {
  for (const url of [
    null,
    "not-a-url",
    "http://w.wallhaven.cc/full/ab/wallhaven-abc123.jpg",
    "http://127.0.0.1/private",
    "https://w.wallhaven.cc.evil.example/full/ab/wallhaven-abc123.jpg",
    "https://user:pass@w.wallhaven.cc/full/ab/wallhaven-abc123.jpg",
    "https://w.wallhaven.cc:8443/full/ab/wallhaven-abc123.jpg",
    "https://w.wallhaven.cc/full/xx/wallhaven-abc123.jpg",
    "https://w.wallhaven.cc/full/ab/wallhaven-abc123.svg",
    "https://w.wallhaven.cc/full/ab/wallhaven-abc123.jpg?redirect=http://localhost",
    "https://w.wallhaven.cc/full/ab/wallhaven-abc123.jpg#fragment",
  ]) {
    assert.equal(validateDownloadUrl(url), null, String(url));
  }
});

test("expanded resolution tiers map to their real landscape and portrait dimensions", async () => {
  const { RESOLUTION_PRESETS, resolutionDimensions } = await import("../src/lib/resolutions.ts");
  const expected = {
    hd: "1920x1080",
    "2k": "2048x1080",
    qhd: "2560x1440",
    "4k": "3840x2160",
    "5k": "5120x2880",
    "6k": "6144x3456",
    "8k": "7680x4320",
    "12k": "11520x6480",
    "16k": "15360x8640",
  };
  for (const [preset, dimensions] of Object.entries(expected)) {
    assert.equal(getCollectionOptions({ resolution: preset }).atleast, dimensions);
    assert.equal(
      getCollectionOptions({ resolution: preset }, "toplist", true).atleast,
      dimensions.split("x").reverse().join("x"),
    );
  }
  assert.equal(resolutionDimensions("invalid"), undefined);
  assert.equal(
    new Set(RESOLUTION_PRESETS.map((preset) => preset.value)).size,
    RESOLUTION_PRESETS.length,
  );
});
test("exact filtering uses the API exact-resolution parameter and clears minimum filtering", () => {
  const exact = getCollectionOptions({ resolution: "16k", match: "exact" });
  assert.equal(exact.resolutions, "15360x8640");
  assert.equal(exact.atleast, undefined);
  const portrait = getCollectionOptions({
    resolution: "4k",
    match: "exact",
    orientation: "portrait",
  });
  assert.equal(portrait.resolutions, "2160x3840");
  assert.equal(portrait.atleast, undefined);
  const any = getCollectionOptions({ resolution: "any", match: "exact" });
  assert.equal(any.resolutions, undefined);
  assert.equal(any.atleast, undefined);
  assert.equal(getCollectionOptions({ resolution: "hd", match: "invalid" }).atleast, "1920x1080");
});
test("resolution labels handle portrait images and do not overstate a narrow image", async () => {
  const { resolutionTier, displayAspectRatio } = await import("../src/lib/resolutions.ts");
  assert.equal(resolutionTier(3840, 2160), "4K UHD");
  assert.equal(resolutionTier(2160, 3840), "4K UHD");
  assert.equal(resolutionTier(15360, 8640), "16K");
  assert.equal(resolutionTier(3840, 1080), "2K DCI");
  assert.equal(displayAspectRatio(3840, 2160), "16:9");
  assert.equal(displayAspectRatio(2160, 3840), "9:16");
});
test("detail titles prefer a specific subject over broad tags", async () => {
  const { wallpaperTitle } = await import("../src/lib/format.ts");
  assert.equal(
    wallpaperTitle([{ name: "car" }, { name: "Ferrari" }, { name: "Ferrari F40" }], "general"),
    "Ferrari F40",
  );
  assert.equal(wallpaperTitle(undefined, "general"), "General wallpaper");
});
