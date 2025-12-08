function countTriples(n: number): number {
    let count: number = 0;
    for (let a: number = 1; a < n; a++) {
        for (let b: number = 1; b < n; b++) {
            const sumOfSquares: number = a * a + b * b;
            const c: number = Math.floor(Math.sqrt(sumOfSquares));
            if (c <= n && c * c === sumOfSquares) {
                count++;
            }
        }
    }
    return count;
}
