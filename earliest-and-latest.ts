const memoTable: number[][][] = Array.from({ length: 30 }, () =>
    Array.from({ length: 30 }, () => Array(31).fill(0)),
);
function earliestAndLatest(n: number, firstPlayer: number, secondPlayer: number): number[] {
    return calculateRounds(firstPlayer - 1, secondPlayer - 1, n);
}
function calculateRounds(leftPlayerPos: number, rightPlayerPos: number, totalPlayers: number): number[] {
    if (memoTable[leftPlayerPos][rightPlayerPos][totalPlayers] !== 0) {
        return decodeResult(memoTable[leftPlayerPos][rightPlayerPos][totalPlayers]);
    }
    if (leftPlayerPos + rightPlayerPos === totalPlayers - 1) {
        memoTable[leftPlayerPos][rightPlayerPos][totalPlayers] = encodeResult(1, 1);
        return [1, 1];
    }
    let minRounds = Number.MAX_SAFE_INTEGER;
    let maxRounds = Number.MIN_SAFE_INTEGER;
    const halfPlayers = totalPlayers >> 1;
    for (let matchOutcomes = 0; matchOutcomes < (1 << halfPlayers); matchOutcomes++) {
        const winnerStatus: boolean[] = Array(totalPlayers).fill(false);
        for (let pairIndex = 0; pairIndex < halfPlayers; pairIndex++) {
            if ((matchOutcomes >> pairIndex) & 1) {
                winnerStatus[pairIndex] = true;
            } else {
                winnerStatus[totalPlayers - 1 - pairIndex] = true;
            }
        }
        if (totalPlayers & 1) {
            winnerStatus[halfPlayers] = true;
        }
        winnerStatus[totalPlayers - 1 - leftPlayerPos] = false;
        winnerStatus[totalPlayers - 1 - rightPlayerPos] = false;
        winnerStatus[leftPlayerPos] = true;
        winnerStatus[rightPlayerPos] = true;
        let newLeftPos = 0;
        let newRightPos = 0;
        let winnerCount = 0;
        for (let position = 0; position < totalPlayers; position++) {
            if (position === leftPlayerPos) {
                newLeftPos = winnerCount;
            }
            if (position === rightPlayerPos) {
                newRightPos = winnerCount;
            }
            if (winnerStatus[position]) {
                winnerCount++;
            }
        }
        const nextRoundResult = calculateRounds(newLeftPos, newRightPos, winnerCount);
        minRounds = Math.min(minRounds, nextRoundResult[0] + 1);
        maxRounds = Math.max(maxRounds, nextRoundResult[1] + 1);
    }
    memoTable[leftPlayerPos][rightPlayerPos][totalPlayers] = encodeResult(minRounds, maxRounds);
    return [minRounds, maxRounds];
}
function encodeResult(minValue: number, maxValue: number): number {
    return (minValue << 8) | maxValue;
}
function decodeResult(encodedValue: number): number[] {
    return [encodedValue >> 8, encodedValue & 255];
}
