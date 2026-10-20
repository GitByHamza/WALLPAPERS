export const RESOLUTION_PRESETS = [
  { value: "any", label: "Any", width: 0, height: 0 },
  { value: "720p", label: "HD", width: 1280, height: 720 },
  { value: "hd", label: "FHD", width: 1920, height: 1080 },
  { value: "2k", label: "2K DCI", width: 2048, height: 1080 },
  { value: "qhd", label: "QHD", width: 2560, height: 1440 },
  { value: "4k", label: "4K UHD", width: 3840, height: 2160 },
  { value: "5k", label: "5K", width: 5120, height: 2880 },
  { value: "6k", label: "6K", width: 6144, height: 3456 },
  { value: "8k", label: "8K", width: 7680, height: 4320 },
  { value: "12k", label: "12K", width: 11520, height: 6480 },
  { value: "16k", label: "16K", width: 15360, height: 8640 },
] as const;

export function resolutionDimensions(value: string, portrait = false) {
  const preset = RESOLUTION_PRESETS.find((item) => item.value === value);
  if (!preset?.width) return undefined;
  return portrait ? `${preset.height}x${preset.width}` : `${preset.width}x${preset.height}`;
}

export function resolutionTier(width: number, height: number) {
  const long = Math.max(width, height);
  const short = Math.min(width, height);
  return (
    [...RESOLUTION_PRESETS]
      .reverse()
      .find((preset) => preset.width > 0 && long >= preset.width && short >= preset.height)
      ?.label || "Original"
  );
}

export function displayAspectRatio(width: number, height: number) {
  if (width <= 0 || height <= 0) return "—";
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const factor = gcd(width, height);
  const ratios = [
    [16, 9],
    [16, 10],
    [21, 9],
    [32, 9],
    [9, 16],
    [10, 16],
    [4, 3],
    [3, 2],
    [1, 1],
  ];
  const familiar = ratios.find(([x, y]) => Math.abs(width / height - x / y) < 0.005);
  return familiar ? `${familiar[0]}:${familiar[1]}` : `${width / factor}:${height / factor}`;
}
