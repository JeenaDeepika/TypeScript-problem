function countMaxOrSubsets(nums: number[]): number {
    let answerCount: number = 0;
    const maximumOrValue: number = nums.reduce((accumulator, currentValue) => accumulator | currentValue, 0);
    const depthFirstSearch = (currentIndex: number, currentOrValue: number): void => {
        if (currentIndex === nums.length) {
            if (currentOrValue === maximumOrValue) {
                answerCount++;
            }
            return;
        }
        depthFirstSearch(currentIndex + 1, currentOrValue);
        depthFirstSearch(currentIndex + 1, currentOrValue | nums[currentIndex]);
    };
    depthFirstSearch(0, 0);
    return answerCount;
}
