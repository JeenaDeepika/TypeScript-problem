function prefixesDivBy5(nums: number[]): boolean[] {
    const result: boolean[] = [];
    let currentValue = 0;
    for (const binaryDigit of nums) {
        currentValue = ((currentValue << 1) | binaryDigit) % 5;
        result.push(currentValue === 0);
    }
    return result;
}
