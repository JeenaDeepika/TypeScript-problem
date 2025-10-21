function maxFrequency(nums: number[], k: number, numOperations: number): number {

    const frequencyMap: Record<number, number> = {};
  
    const differenceArray: Record<number, number> = {};
    for (const num of nums) {
        
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
      
        
        differenceArray[num] = differenceArray[num] || 0;
      
        differenceArray[num - k] = (differenceArray[num - k] || 0) + 1;
        
        differenceArray[num + k + 1] = (differenceArray[num + k + 1] || 0) - 1;
    }
  
    let maxFrequency: number = 0;
    let runningSum: number = 0;
  
    const sortedKeys: number[] = Object.keys(differenceArray)
        .map(Number)
        .sort((a, b) => a - b);
    for (const targetValue of sortedKeys) {
        
        runningSum += differenceArray[targetValue];
      
        const currentFrequency = Math.min(
            runningSum, 
            (frequencyMap[targetValue] || 0) + numOperations
        );
      
        maxFrequency = Math.max(maxFrequency, currentFrequency);
    }
  
    return maxFrequency;
}
