function minDeletionSize(A: string[]): number {
    if (!A || A.length <= 1) {
        return 0;
    }
    const numStrings: number = A.length;
    const stringLength: number = A[0].length;
    let deletedColumns: number = 0;
    const sorted: boolean[] = new Array(numStrings).fill(false);
    columnLoop:
    for (let col = 0; col < stringLength; col++) {
        for (let row = 0; row < numStrings - 1; row++) {
            if (!sorted[row] && A[row].charAt(col) > A[row + 1].charAt(col)) {
                deletedColumns++;
                continue columnLoop; 
            }
        }
        for (let row = 0; row < numStrings - 1; row++) {
            if (A[row].charAt(col) < A[row + 1].charAt(col)) {
                sorted[row] = true;
            }
        }
    }
  
    return deletedColumns;
}
