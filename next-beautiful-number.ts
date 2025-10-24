function nextBeautifulNumber(n: number): number {
    for (let candidate = n + 1; ; candidate++) {
        const digitCounts: number[] = Array(10).fill(0);
        let tempNumber = candidate;
        while (tempNumber > 0) {
            const lastDigit = tempNumber % 10;
            digitCounts[lastDigit]++;
            tempNumber = Math.floor(tempNumber / 10);
        }
        let isBeautiful = true;
        for (let digit = 0; digit < 10; digit++) {
            if (digitCounts[digit] > 0 && digitCounts[digit] !== digit) {
                isBeautiful = false;
                break;
            }
        }
        if (isBeautiful) {
            return candidate;
        }
    }
}
