function numSubseq(nums: number[], target: number): number {
    nums.sort((a, b) => a - b);
    const MOD = 1e9 + 7;
    const length = nums.length;
    const powers: number[] = Array(length + 1).fill(1);
    for (let i = 1; i <= length; i++) {
        powers[i] = (powers[i - 1] * 2) % MOD;
    }
    let result = 0;
    for (let minIndex = 0; minIndex < length && nums[minIndex] * 2 <= target; minIndex++) {
        const maxValue = target - nums[minIndex];
        const maxIndex = search(nums, maxValue, minIndex + 1) - 1;
        if (maxIndex >= minIndex) {
            result = (result + powers[maxIndex - minIndex]) % MOD;
        }
    }
  
    return result;
}
function search(nums: number[], targetValue: number, startIndex: number): number {
    let left = startIndex;
    let right = nums.length;
    while (left < right) {
        const mid = (left + right) >> 1; 
        if (nums[mid] > targetValue) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
  
    return left;
}
