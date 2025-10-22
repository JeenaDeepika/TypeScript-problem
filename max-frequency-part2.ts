function maxFrequency(nums: number[], k: number, numOperations: number): number {
    
    const frequencyMap: Record<number, number> = {};
  
    const differenceArray: Record<number, number> = {};
  
    for (const num of nums) {

        frequencyMap[num] = (frequencyMap[num] || 0) + 1;

        differenceArray[num] = differenceArray[num] || 0;
        differenceArray[num - k] = (differenceArray[num - k] || 0) + 1;
        differenceArray[num + k + 1] = (differenceArray[num + k + 1] || 0) - 1;
    }

    let maxFrequencyResult: number = 0;

    let prefixSum: number = 0;
  
    const sortedPositions: number[] = Object.keys(differenceArray)
        .map(Number)
        .sort((a, b) => a - b);
  
    for (const position of sortedPositions) {

        prefixSum += differenceArray[position];

        const currentFrequency: number = Math.min(
            prefixSum, 
            (frequencyMap[position] || 0) + numOperations
        );
        maxFrequencyResult = Math.max(maxFrequencyResult, currentFrequency);
    }
  
    return maxFrequencyResult;
}
