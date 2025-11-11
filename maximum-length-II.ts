function maximumLength(nums: number[], k: number): number {
    const dp: number[][] = Array.from({ length: k }, () => Array(k).fill(0));
    let maxLength: number = 0;
    for (let num of nums) {
        const currentRemainder: number = num % k;
        for (let previousRemainder = 0; previousRemainder < k; ++previousRemainder) {
            const secondToLastRemainder: number = (previousRemainder - currentRemainder + k) % k;
            dp[currentRemainder][secondToLastRemainder] = dp[secondToLastRemainder][currentRemainder] + 1;
            maxLength = Math.max(maxLength, dp[currentRemainder][secondToLastRemainder]);
        }
    }
    return maxLength;
}
