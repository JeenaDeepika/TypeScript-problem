function minimumDifference(nums: number[]): number {
    const totalLength = nums.length;
    const segmentSize = Math.floor(totalLength / 3);
    const prefixMinSum: number[] = Array(totalLength + 1);
    const maxHeap = new MaxPriorityQueue<number>();
    let currentSum = 0;
    for (let i = 1; i <= segmentSize * 2; ++i) {
        const currentElement = nums[i - 1];
        currentSum += currentElement;
        maxHeap.enqueue(currentElement);
        if (maxHeap.size() > segmentSize) {
            currentSum -= maxHeap.dequeue();
        }
      
        prefixMinSum[i] = currentSum;
    }
    const suffixMaxSum: number[] = Array(totalLength + 1);
    const minHeap = new MinPriorityQueue<number>();
    currentSum = 0;
    for (let i = totalLength; i > segmentSize; --i) {
        const currentElement = nums[i - 1];
        currentSum += currentElement;
        minHeap.enqueue(currentElement);
        if (minHeap.size() > segmentSize) {
            currentSum -= minHeap.dequeue();
        }
      
        suffixMaxSum[i] = currentSum;
    }
    let minimumDifference = Number.MAX_SAFE_INTEGER;
    for (let splitPoint = segmentSize; splitPoint <= segmentSize * 2; ++splitPoint) {
        const difference = prefixMinSum[splitPoint] - suffixMaxSum[splitPoint + 1];
        minimumDifference = Math.min(minimumDifference, difference);
    }
  
    return minimumDifference;
}
