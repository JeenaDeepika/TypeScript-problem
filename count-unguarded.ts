function countUnguarded(m: number, n: number, guards: number[][], walls: number[][]): number {
    const grid: number[][] = Array.from({ length: m }, () => 
        Array.from({ length: n }, () => 0)
    );
    for (const [row, col] of guards) {
        grid[row][col] = 2;
    }
    for (const [row, col] of walls) {
        grid[row][col] = 2;
    }
    const directions: number[] = [-1, 0, 1, 0, -1];
    for (const [guardRow, guardCol] of guards) {
        for (let dirIndex = 0; dirIndex < 4; dirIndex++) {
            let currentRow: number = guardRow;
            let currentCol: number = guardCol;
            const rowDelta: number = directions[dirIndex];
            const colDelta: number = directions[dirIndex + 1];

            while (currentRow + rowDelta >= 0 && 
                   currentRow + rowDelta < m && 
                   currentCol + colDelta >= 0 && 
                   currentCol + colDelta < n && 
                   grid[currentRow + rowDelta][currentCol + colDelta] < 2) {
                currentRow += rowDelta;
                currentCol += colDelta;
                grid[currentRow][currentCol] = 1;
            }
        }
    }
    let unguardedCount: number = 0;
    for (const row of grid) {
        for (const cellValue of row) {
            unguardedCount += cellValue === 0 ? 1 : 0;
        }
    }
  
    return unguardedCount;
}
