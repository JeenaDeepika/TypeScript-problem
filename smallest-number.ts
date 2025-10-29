function smallestNumber(n: number): number {
    let powerOfTwo = 1;
    while (powerOfTwo - 1 < n) {
        powerOfTwo <<= 1;
    }
    return powerOfTwo - 1;
}
