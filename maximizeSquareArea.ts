const MOD = BigInt(1e9 + 7);

function maximizeSquareArea(
  m: number,
  n: number,
  hFences: number[],
  vFences: number[]
): number {
  const heights = findUniqueLengths(hFences, m);
  const widths = findUniqueLengths(vFences, n);
  let maxSide = -1;

  for (const h of heights) {
    if (h > maxSide && widths.has(h)) maxSide = h;
  }

  if (maxSide < 0) return -1;

  const d = BigInt(maxSide);
  return Number((d * d) % MOD);
}

function findUniqueLengths(fences: number[], max: number): Set<number> {
  const ans = new Set<number>();
  const n = fences.length;

  ans.add(max - 1);

  for (let i = 0; i < n; ++i) {
    ans.add(fences[i] - 1);
    ans.add(max - fences[i]);
    for (let j = i + 1; j < n; ++j) {
      ans.add(Math.abs(fences[i] - fences[j]));
    }
  }

  return ans;
}
