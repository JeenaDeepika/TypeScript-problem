function numberOfWays(corridor: string): number {
    const corridorLength: number = corridor.length;
    const MOD: number = 10 ** 9 + 7;
    const memoTable: number[][] = Array.from(
        { length: corridorLength }, 
        () => Array(3).fill(-1)
    );
    const countWays = (position: number, seatsInSection: number): number => {
        if (position >= corridorLength) {
            return seatsInSection === 2 ? 1 : 0;
        }
        if (memoTable[position][seatsInSection] !== -1) {
            return memoTable[position][seatsInSection];
        }
        let currentSeatCount: number = seatsInSection;
        if (corridor[position] === 'S') {
            currentSeatCount++;
        }
        if (currentSeatCount > 2) {
            memoTable[position][seatsInSection] = 0;
            return 0;
        }
        let totalWays: number = countWays(position + 1, currentSeatCount);
        if (currentSeatCount === 2) {
            totalWays = (totalWays + countWays(position + 1, 0)) % MOD;
        }
        memoTable[position][seatsInSection] = totalWays;
        return totalWays;
    };
    return countWays(0, 0);
}
