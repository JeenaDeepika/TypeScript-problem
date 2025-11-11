function findMaxForm(strs: string[], m: number, n: number): number {
    const stringCount = strs.length;
    const dp = Array.from({ length: stringCount + 1 }, () =>
        Array.from({ length: m + 1 }, () => 
            Array.from({ length: n + 1 }, () => 0)
        )
    );
    const countZerosAndOnes = (str: string): [number, number] => {
        let zeroCount = 0;
        for (const char of str) {
            zeroCount += char === '0' ? 1 : 0;
        }
        const oneCount = str.length - zeroCount;
        return [zeroCount, oneCount];
    };
    for (let i = 1; i <= stringCount; ++i) {
        const [zerosNeeded, onesNeeded] = countZerosAndOnes(strs[i - 1]);
        for (let availableZeros = 0; availableZeros <= m; ++availableZeros) {
            for (let availableOnes = 0; availableOnes <= n; ++availableOnes) {
                dp[i][availableZeros][availableOnes] = dp[i - 1][availableZeros][availableOnes];
                if (availableZeros >= zerosNeeded && availableOnes >= onesNeeded) {
                    dp[i][availableZeros][availableOnes] = Math.max(
                        dp[i][availableZeros][availableOnes],
                        dp[i - 1][availableZeros - zerosNeeded][availableOnes - onesNeeded] + 1
                    );
                }
            }
        }
    }
    return dp[stringCount][m][n];
}
