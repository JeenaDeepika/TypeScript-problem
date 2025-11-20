function intersectionSizeTwo(intervals: number[][]): number {
    intervals.sort((a: number[], b: number[]) => {
        if (a[1] === b[1]) {
            return b[0] - a[0];
        }
        return a[1] - b[1];
    });
    let result: number = 0;
    let secondLastPoint: number = -1;
    let lastPoint: number = -1;
    for (const interval of intervals) {
        const start: number = interval[0];
        const end: number = interval[1];
        if (start <= secondLastPoint) {
            continue;
        }
        if (start > lastPoint) {
            result += 2;
            secondLastPoint = end - 1;
            lastPoint = end;
        } 
        else {
            result += 1;
            secondLastPoint = lastPoint;
            lastPoint = end;
        }
    }
  
    return result;
}
