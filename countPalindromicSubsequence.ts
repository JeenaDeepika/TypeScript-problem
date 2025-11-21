function countPalindromicSubsequence(s: string): number {
    let totalCount: number = 0;
    const ASCII_LOWERCASE_A: number = 'a'.charCodeAt(0);
    for (let charIndex = 0; charIndex < 26; charIndex++) {
        const currentChar: string = String.fromCharCode(charIndex + ASCII_LOWERCASE_A);
        const firstOccurrence: number = s.indexOf(currentChar);
        const lastOccurrence: number = s.lastIndexOf(currentChar);
        let uniqueMiddleCharsMask: number = 0;
        for (let middleIndex = firstOccurrence + 1; middleIndex < lastOccurrence; middleIndex++) {
            const charBitPosition: number = s.charCodeAt(middleIndex) - ASCII_LOWERCASE_A;
            if (((uniqueMiddleCharsMask >> charBitPosition) & 1) ^ 1) {
                uniqueMiddleCharsMask |= 1 << charBitPosition;
                totalCount++;
            }
        }
    }
    return totalCount;
}
