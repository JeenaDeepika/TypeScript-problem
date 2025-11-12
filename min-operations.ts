function minOperations(nums: number[]): number {
    const arrayLength: number = nums.length;
    let onesCount: number = 0;
    for (const num of nums) {
        if (num === 1) {
            onesCount++;
        }
    }
    if (onesCount > 0) {
        return arrayLength - onesCount;
    }
    let minSubarrayLength: number = arrayLength + 1;
    for (let startIndex: number = 0; startIndex < arrayLength; startIndex++) {
        let currentGcd: number = 0;
        for (let endIndex: number = startIndex; endIndex < arrayLength; endIndex++) {
            currentGcd = gcd(currentGcd, nums[endIndex]);
          
            if (currentGcd === 1) {
                minSubarrayLength = Math.min(minSubarrayLength, endIndex - startIndex + 1);
            }
        }
    }
    if (minSubarrayLength > arrayLength) {
        return -1;
    }
    return arrayLength - 1 + minSubarrayLength - 1;
}

function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}
