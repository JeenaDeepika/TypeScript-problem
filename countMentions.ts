function countMentions(numberOfUsers: number, events: string[][]): number[] {
    events.sort((eventA: string[], eventB: string[]): number => {
        const timestampA: number = Number(eventA[1]);
        const timestampB: number = Number(eventB[1]);
        if (timestampA === timestampB) {
            return eventA[0].charAt(2) < eventB[0].charAt(2) ? -1 : 1;
        }
        return timestampA - timestampB;
    });
    const mentionCounts: number[] = Array(numberOfUsers).fill(0);
    const onlineUntilTimestamp: number[] = Array(numberOfUsers).fill(0);
    let mentionsToAllUsers: number = 0;
    for (const [eventType, timestamp, eventData] of events) {
        const currentTimestamp: number = Number(timestamp);
        if (eventType.charAt(0) === 'O') {
            const userId: number = Number(eventData);
            onlineUntilTimestamp[userId] = currentTimestamp + 60;
        } else if (eventData.charAt(0) === 'A') {
            mentionsToAllUsers++;
        } else if (eventData.charAt(0) === 'H') {
            for (let userId: number = 0; userId < numberOfUsers; userId++) {
                if (onlineUntilTimestamp[userId] <= currentTimestamp) {
                    mentionCounts[userId]++;
                }
            }
        } else {
            const userMentions: string[] = eventData.split(' ');
            for (const mention of userMentions) {
                const userId: number = Number(mention.slice(2));
                mentionCounts[userId]++;
            }
        }
    }
    if (mentionsToAllUsers > 0) {
        for (let userId: number = 0; userId < numberOfUsers; userId++) {
            mentionCounts[userId] += mentionsToAllUsers;
        }
    }
    return mentionCounts;
}
