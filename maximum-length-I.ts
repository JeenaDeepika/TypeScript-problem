function maximumLength(nums: number[]): number {
    const k: number = 2;
    const frequencyTable: number[][] = Array.from({ length: k }, () => Array(k).fill(0));
    let maxLength: number = 0;
    for (let currentNum of nums) {
        currentNum %= k;
        for (let prevRemainder = 0; prevRemainder < k; ++prevRemainder) {
            const targetRemainder: number = (prevRemainder - currentNum + k) % k;
            frequencyTable[currentNum][targetRemainder] = frequencyTable[targetRemainder][currentNum] + 1;
            maxLength = Math.max(maxLength, frequencyTable[currentNum][targetRemainder]);
        }
    }
  
    return maxLength;
}
