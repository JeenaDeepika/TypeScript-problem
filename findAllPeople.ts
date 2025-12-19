function findAllPeople(n: number, meetings: number[][], firstPerson: number): number[] {
    const parent: number[] = Array.from({ length: n + 1 }, (_, index) => index);
    parent[firstPerson] = 0;

    function findParent(index: number): number {
        if (parent[index] !== index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }
    const meetingsByTime = new Map<number, number[][]>();
  
    for (const meeting of meetings) {
        const [person1, person2, time] = meeting;
      
        if (!meetingsByTime.has(time)) {
            meetingsByTime.set(time, []);
        }
        meetingsByTime.get(time)!.push([person1, person2]);
    }
    const sortedTimes = Array.from(meetingsByTime.keys()).sort((a, b) => a - b);
  
    for (const time of sortedTimes) {
        const currentMeetings = meetingsByTime.get(time)!;
        for (const [personA, personB] of currentMeetings) {
            const rootA = findParent(personA);
            const rootB = findParent(personB);
            if (parent[rootA] === 0 || parent[rootB] === 0) {
                parent[rootA] = 0;
                parent[rootB] = 0;
            }
            parent[rootA] = parent[rootB];
        }
        for (const [personA, personB] of currentMeetings) {
            const rootA = findParent(personA);
            const rootB = findParent(personB);
            if (parent[rootA] === 0 || parent[rootB] === 0) {
                parent[rootA] = 0;
                parent[rootB] = 0;
            } else {
                parent[personA] = personA;
                parent[personB] = personB;
            }
        }
    }
    const result: number[] = [];
  
    for (let i = 0; i <= n; i++) {
        if (parent[findParent(i)] === 0) {
            result.push(i);
        }
    }
  
    return result;
}
