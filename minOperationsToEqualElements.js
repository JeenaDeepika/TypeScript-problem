const minOperationsToEqualElements = function(nums) {
    const gcd = (a, b) => {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    };

    let commonGCD = nums[0];
    for (let i = 1; i < nums.length; i++) {
        commonGCD = gcd(commonGCD, nums[i]);
    }

    let operations = 0;
    for (let num of nums) {
        if (num % commonGCD !== 0) return -1;

        while (num > commonGCD) {
            num -= commonGCD;
            operations++;
        }
    }

    return operations;
}
