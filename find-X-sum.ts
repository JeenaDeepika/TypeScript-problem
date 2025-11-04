function findXSum(nums: number[], k: number, x: number): number[] {
    const comparePairs = (a: [number, number], b: [number, number]): number => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
    };
    let topX: [number, number][] = []; 
    let remaining: [number, number][] = []; 
    let xSum = 0;   
    const frequency: Map<number, number> = new Map();
    const addElement = (value: number): void => {
        const freq = frequency.get(value) || 0;
        if (freq === 0) {
            return;
        }
        const element: [number, number] = [freq, value];
        if (topX.length > 0 && comparePairs(element, topX[0]) > 0) {
            xSum += element[0] * element[1]; 
            topX.push(element);
            topX.sort(comparePairs);  
        } else {
            remaining.push(element);
            remaining.sort(comparePairs);
        }
    };
    const removeElement = (value: number): void => {
        const freq = frequency.get(value) || 0;
        if (freq === 0) {
            return;
        }
        const element: [number, number] = [freq, value];
        const topXIndex = topX.findIndex(e => e[0] === element[0] && e[1] === element[1]);
        if (topXIndex !== -1) {
            xSum -= element[0] * element[1]; 
            topX.splice(topXIndex, 1);
        } else {
            const remainingIndex = remaining.findIndex(e => e[0] === element[0] && e[1] === element[1]);
            if (remainingIndex !== -1) {
                remaining.splice(remainingIndex, 1);
            }
        }
    };
    const result: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        removeElement(nums[i]); 
        frequency.set(nums[i], (frequency.get(nums[i]) || 0) + 1);  
        addElement(nums[i]);                      
        const windowStart = i - k + 1;
        if (windowStart < 0) {
            continue; 
        }
        while (remaining.length > 0 && topX.length < x) {
            const largestRemaining = remaining[remaining.length - 1];
            xSum += largestRemaining[0] * largestRemaining[1];
            remaining.pop();
            topX.push(largestRemaining);
            topX.sort(comparePairs); 
        }
        while (topX.length > x) {
            const smallestTop = topX[0];
            xSum -= smallestTop[0] * smallestTop[1];
            topX.shift();
            remaining.push(smallestTop);
            remaining.sort(comparePairs); 
        }
        result.push(xSum);
        removeElement(nums[windowStart]);  
        const currentFreq = frequency.get(nums[windowStart]) || 0;
        frequency.set(nums[windowStart], currentFreq - 1); 
        addElement(nums[windowStart]);    
    }
    return result;
}
