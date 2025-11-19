function isOneBitCharacter(bits: number[]): boolean {
    let i: number = 0;
    const n: number = bits.length;
    while (i < n - 1) {
        i += bits[i] + 1;
    }
    return i === n - 1;
}
