type MeetingTime = [number, number]; 
function mostBooked(n: number, meetings: number[][]): number {
    const availableRooms: number[] = [];
    const occupiedRooms: MeetingTime[] = [];
    for (let i = 0; i < n; i++) {
        availableRooms.push(i);
    }
    availableRooms.sort((a, b) => a - b);
    const meetingCount: number[] = new Array(n).fill(0);
    meetings.sort((a, b) => a[0] - b[0]);
    for (const meeting of meetings) {
        const startTime = meeting[0];
        const endTime = meeting[1];
        while (occupiedRooms.length > 0 && occupiedRooms[0][0] <= startTime) {
            const freedRoom = occupiedRooms.shift()!;
            availableRooms.push(freedRoom[1]);
            availableRooms.sort((a, b) => a - b);
        }
        let assignedRoom = 0;
        if (availableRooms.length > 0) {
            assignedRoom = availableRooms.shift()!;
            occupiedRooms.push([endTime, assignedRoom]);
            occupiedRooms.sort((a, b) => {
                if (a[0] !== b[0]) return a[0] - b[0]; 
                return a[1] - b[1]; 
            });
        }
        else {
            const earliestFreeRoom = occupiedRooms.shift()!;
            assignedRoom = earliestFreeRoom[1];
            const delayedEndTime = earliestFreeRoom[0] + (endTime - startTime);
            occupiedRooms.push([delayedEndTime, assignedRoom]);
            occupiedRooms.sort((a, b) => {
                if (a[0] !== b[0]) return a[0] - b[0];
                return a[1] - b[1]; 
            });
        }
        meetingCount[assignedRoom]++;
    }
    let mostUsedRoom = 0;
    for (let i = 0; i < n; i++) {
        if (meetingCount[mostUsedRoom] < meetingCount[i]) {
            mostUsedRoom = i;
        }
    }
    return mostUsedRoom;
}
