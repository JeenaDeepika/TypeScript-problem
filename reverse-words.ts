function reverseWords(s: string): string {
    const words: string[] = [];
    const stringLength: number = s.length;
    let currentIndex: number = 0;
    while (currentIndex < stringLength) {
        while (currentIndex < stringLength && s[currentIndex] === ' ') {
            currentIndex++;
        }
        if (currentIndex < stringLength) {
            let wordEndIndex: number = currentIndex;
            while (wordEndIndex < stringLength && s[wordEndIndex] !== ' ') {
                wordEndIndex++;
            }
            words.push(s.slice(currentIndex, wordEndIndex));
            currentIndex = wordEndIndex;
        }
    }
    return words.reverse().join(' ');
}
