function findFinalValue(nums: number[], original: number): number {
    const numSet: Set<number> = new Set(nums);
    while (numSet.has(original)) {
        original <<= 1;
    }
    return original;
}
