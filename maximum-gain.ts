function maximumGain(s: string, x: number, y: number): number {
    let firstChar: string = 'a';
    let secondChar: string = 'b';
    if (x < y) {
        [x, y] = [y, x];
        [firstChar, secondChar] = [secondChar, firstChar];
    }
    let totalPoints: number = 0;
    let firstCharCount: number = 0;
    let secondCharCount: number = 0;
    for (const currentChar of s) {
        if (currentChar === firstChar) {
            firstCharCount++;
        } else if (currentChar === secondChar) {
            if (firstCharCount > 0) {
                totalPoints += x;
                firstCharCount--;
            } else {
                secondCharCount++;
            }
        } else {
            totalPoints += Math.min(firstCharCount, secondCharCount) * y;
            firstCharCount = 0;
            secondCharCount = 0;
        }
    }
    totalPoints += Math.min(firstCharCount, secondCharCount) * y;
    return totalPoints;
}
