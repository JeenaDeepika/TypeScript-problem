function countCoveredBuildings(n: number, buildings: number[][]): number {
    const xToYCoordinates: Map<number, number[]> = new Map();
    const yToXCoordinates: Map<number, number[]> = new Map();
    for (const [xCoord, yCoord] of buildings) {
        if (!xToYCoordinates.has(xCoord)) {
            xToYCoordinates.set(xCoord, []);
        }
        xToYCoordinates.get(xCoord)?.push(yCoord);
        if (!yToXCoordinates.has(yCoord)) {
            yToXCoordinates.set(yCoord, []);
        }
        yToXCoordinates.get(yCoord)?.push(xCoord);
    }
    for (const yCoordList of xToYCoordinates.values()) {
        yCoordList.sort((a, b) => a - b);
    }
    for (const xCoordList of yToXCoordinates.values()) {
        xCoordList.sort((a, b) => a - b);
    }
    let coveredBuildingsCount = 0;
    for (const [xCoord, yCoord] of buildings) {
        const yCoordinatesOnSameX = xToYCoordinates.get(xCoord)!;
        const xCoordinatesOnSameY = yToXCoordinates.get(yCoord)!;
        const isBetweenHorizontally = xCoordinatesOnSameY[0] < xCoord && 
                                      xCoord < xCoordinatesOnSameY[xCoordinatesOnSameY.length - 1];
        const isBetweenVertically = yCoordinatesOnSameX[0] < yCoord && 
                                    yCoord < yCoordinatesOnSameX[yCoordinatesOnSameX.length - 1];
        if (isBetweenHorizontally && isBetweenVertically) {
            coveredBuildingsCount++;
        }
    }
    return coveredBuildingsCount;
}
