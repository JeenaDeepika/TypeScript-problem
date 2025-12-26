function bestClosingTime(customers: string): number {
    const n: number = customers.length;
    const prefixSum: number[] = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefixSum[i + 1] = prefixSum[i] + (customers[i] === 'Y' ? 1 : 0);
    }
    let bestHour: number = 0;
    let minCost: number = Number.MAX_SAFE_INTEGER;
    for (let closingHour = 0; closingHour <= n; closingHour++) {
        const noCustomerPenalty: number = closingHour - prefixSum[closingHour];
        const customerPenalty: number = prefixSum[n] - prefixSum[closingHour];
        const totalCost: number = noCustomerPenalty + customerPenalty;
        if (totalCost < minCost) {
            bestHour = closingHour;
            minCost = totalCost;
        }
    }
    return bestHour;
}
