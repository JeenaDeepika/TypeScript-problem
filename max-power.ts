function maxPower(stations: number[], r: number, k: number): number {
    const n = stations.length;
    const powerDifference: bigint[] = new Array(n + 1).fill(0n);
    const cumulativePower: bigint[] = new Array(n + 1).fill(0n);
    for (let i = 0; i < n; ++i) {
        const leftBound = Math.max(0, i - r);
        const rightBound = Math.min(i + r, n - 1);
        powerDifference[leftBound] += BigInt(stations[i]);
        powerDifference[rightBound + 1] -= BigInt(stations[i]);
    }
    cumulativePower[0] = powerDifference[0];
    for (let i = 1; i < n + 1; ++i) {
        cumulativePower[i] = cumulativePower[i - 1] + powerDifference[i];
    }
    function canAchieveMinPower(targetPower: bigint, additionalStations: bigint): boolean {
        const tempDifference: bigint[] = new Array(n + 1).fill(0n);
        let additionalPower = 0n;
        for (let cityIndex = 0; cityIndex < n; ++cityIndex) {
            additionalPower += tempDifference[cityIndex];
            const powerDeficit = targetPower - (cumulativePower[cityIndex] + additionalPower);
          
            if (powerDeficit > 0) {
                if (additionalStations < powerDeficit) {
                    return false;
                }
                additionalStations -= powerDeficit;
                const optimalPosition = Math.min(cityIndex + r, n - 1);
                const coverageLeft = Math.max(0, optimalPosition - r);
                const coverageRight = Math.min(optimalPosition + r, n - 1);
                tempDifference[coverageLeft] += powerDeficit;
                tempDifference[coverageRight + 1] -= powerDeficit;
                additionalPower += powerDeficit;
            }
        }
        return true;
    }
    let searchLeft = 0n;
    let searchRight = 1n << 40n; 
    while (searchLeft < searchRight) {
        const mid = (searchLeft + searchRight + 1n) >> 1n;
        if (canAchieveMinPower(mid, BigInt(k))) {
            searchLeft = mid;
        } else {
            searchRight = mid - 1n;
        }
    }
    return Number(searchLeft);
}
