function minimumOneBitOperations(n: number): number {
    let result: number = 0;
    while (n > 0) {
        result ^= n;
        n >>= 1;
    }
    return result;
}
