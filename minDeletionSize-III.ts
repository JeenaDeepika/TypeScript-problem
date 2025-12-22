function minDeletionSize(strs: string[]): number {
    const stringLength: number = strs[0].length;
    const dp: number[] = Array(stringLength).fill(1);
    for (let currentCol = 1; currentCol < stringLength; currentCol++) {
        for (let previousCol = 0; previousCol < currentCol; previousCol++) {
            let canFormSequence: boolean = true;
            for (const str of strs) {
                if (str[previousCol] > str[currentCol]) {
                    canFormSequence = false;
                    break;
                }
            }
            if (canFormSequence) {
                dp[currentCol] = Math.max(dp[currentCol], dp[previousCol] + 1);
            }
        }
    }
    return stringLength - Math.max(...dp);
}
