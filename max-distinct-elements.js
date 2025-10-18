function maxDistinctElements(nums: number[], k: number): number {
    nums.sort((a: number, b: number) => a - b);
    let distinctCount: number = 0;
    let previousValue: number = -Infinity;
    for (const currentNum of nums) {
        const lowerBound: number = Math.max(currentNum - k, previousValue + 1);
        const assignedValue: number = Math.min(currentNum + k, lowerBound);
        if (assignedValue > previousValue) {
            distinctCount++;
            previousValue = assignedValue;
        }
    }
    return distinctCount;
}
