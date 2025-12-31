function latestDayToCross(row: number, col: number, cells: number[][]): number {
    const canCrossOnDay = (dayNumber: number): boolean => {
        const grid: number[][] = Array.from({ length: row }, () => Array(col).fill(0));

        for (let i = 0; i < dayNumber; ++i) {
            const [cellRow, cellCol] = cells[i];
            grid[cellRow - 1][cellCol - 1] = 1;
        }

        const queue: number[][] = [];

        for (let j = 0; j < col; ++j) {
            if (grid[0][j] === 0) {
                queue.push([0, j]);
                grid[0][j] = 1;
            }
        }

        const directions: number[] = [-1, 0, 1, 0, -1];

        for (const [currentRow, currentCol] of queue) {
            if (currentRow === row - 1) {
                return true;
            }

            for (let i = 0; i < 4; ++i) {
                const nextRow: number = currentRow + directions[i];
                const nextCol: number = currentCol + directions[i + 1];

                if (nextRow >= 0 && nextRow < row &&
                    nextCol >= 0 && nextCol < col &&
                    grid[nextRow][nextCol] === 0) {
                    queue.push([nextRow, nextCol]);
                    grid[nextRow][nextCol] = 1;
                }
            }
        }

        return false;
    };

    const feasible = (day: number): boolean => {
        return !canCrossOnDay(day);
    };
    let left = 1;
    let right = cells.length;
    let firstTrueIndex = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (feasible(mid)) {
            firstTrueIndex = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return firstTrueIndex - 1;
}
