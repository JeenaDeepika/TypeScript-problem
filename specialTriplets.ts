function specialTriplets(nums: number[]): number {
    const leftFrequency = new Map<number, number>();
    const rightFrequency = new Map<number, number>();
    for (const num of nums) {
        rightFrequency.set(num, (rightFrequency.get(num) || 0) + 1);
    }
    let tripletCount = 0;
    const MOD = 1e9 + 7;
    for (const currentNum of nums) {
        rightFrequency.set(currentNum, (rightFrequency.get(currentNum) || 0) - 1);
        const targetValue = currentNum * 2;
        const leftCount = leftFrequency.get(targetValue) || 0;
        const rightCount = rightFrequency.get(targetValue) || 0;
        tripletCount = (tripletCount + ((leftCount * rightCount) % MOD)) % MOD;
        leftFrequency.set(currentNum, (leftFrequency.get(currentNum) || 0) + 1);
    }
    return tripletCount;
}
