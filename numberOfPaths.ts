function numberOfPaths(grid: number[][], k: number): number {
    const MOD = 1000000007;
    const rows = grid.length;
    const cols = grid[0].length;
    const dp: number[][][] = Array.from({ length: rows + 1 }, () =>
        Array.from({ length: cols + 1 }, () => 
            new Array(k).fill(0)
        )
    );
    dp[0][1][0] = 1;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            for (let prevRemainder = 0; prevRemainder < k; prevRemainder++) {
                const newRemainder = (grid[i][j] + prevRemainder) % k;
                dp[i + 1][j + 1][newRemainder] = (
                    dp[i][j + 1][prevRemainder] +   
                    dp[i + 1][j][prevRemainder] +  
                    dp[i + 1][j + 1][newRemainder]  
                ) % MOD;
            }
        }
    }
    return dp[rows][cols][0];
}
