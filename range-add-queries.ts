function rangeAddQueries(n: number, queries: number[][]): number[][] {
    const matrix: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
    for (const query of queries) {
        const row1 = query[0];
        const col1 = query[1];
        const row2 = query[2];
        const col2 = query[3];
        matrix[row1][col1]++;
        if (row2 + 1 < n) {
            matrix[row2 + 1][col1]--;
        }
        if (col2 + 1 < n) {
            matrix[row1][col2 + 1]--;
        }
        if (row2 + 1 < n && col2 + 1 < n) {
            matrix[row2 + 1][col2 + 1]++;
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i > 0) {
                matrix[i][j] += matrix[i - 1][j];
            }
            if (j > 0) {
                matrix[i][j] += matrix[i][j - 1];
            }
            if (i > 0 && j > 0) {
                matrix[i][j] -= matrix[i - 1][j - 1];
            }
        }
    }
    return matrix;
}
