function matchPlayersAndTrainers(players: number[], trainers: number[]): number {
    players.sort((a: number, b: number) => a - b);
    trainers.sort((a: number, b: number) => a - b);
    const playersCount: number = players.length;
    const trainersCount: number = trainers.length;
    let playerIndex: number = 0;
    let trainerIndex: number = 0;
    while (playerIndex < playersCount) {
        while (trainerIndex < trainersCount && trainers[trainerIndex] < players[playerIndex]) {
            trainerIndex++;
        }
        if (trainerIndex === trainersCount) {
            return playerIndex;
        }
        playerIndex++;
        trainerIndex++;
    }
    return playersCount;
}
