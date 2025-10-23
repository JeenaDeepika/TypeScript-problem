function hasSameDigits(s: string): boolean {
    const digits: number[] = s.split('').map(Number);
    const length: number = digits.length;
    for (let currentLevel = length - 1; currentLevel > 1; --currentLevel) {
        for (let index = 0; index < currentLevel; ++index) {
            digits[index] = (digits[index] + digits[index + 1]) % 10;
        }
    }
    return digits[0] === digits[1];
}
