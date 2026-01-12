function minTimeToVisitAllPoints(points: number[][]): number {
    let totalTime: number = 0;
    for (let i: number = 1; i < points.length; i++) {
        const deltaX: number = Math.abs(points[i][0] - points[i - 1][0]);
        const deltaY: number = Math.abs(points[i][1] - points[i - 1][1]);
        totalTime += Math.max(deltaX, deltaY);
    }
    return totalTime;
}
