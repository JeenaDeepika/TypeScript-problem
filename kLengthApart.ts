function kLengthApart(nums: number[], k: number): boolean {
    let previousOneIndex: number = -(k + 1);
    for (let currentIndex: number = 0; currentIndex < nums.length; currentIndex++) {
        if (nums[currentIndex] === 1) {
            if (currentIndex - previousOneIndex - 1 < k) {
                return false;
            }
            previousOneIndex = currentIndex;
        }
    }
    return true;
}
