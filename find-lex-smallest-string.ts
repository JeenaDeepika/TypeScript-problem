function findLexSmallestString(s: string, a: number, b: number): string {
    const bfsQueue: string[] = [s];
    const visited: Set<string> = new Set([s]);
    let minString: string = s;
    const stringLength: number = s.length;
    while (bfsQueue.length > 0) {
        const currentString: string = bfsQueue.shift()!;
        if (currentString < minString) {
            minString = currentString;
        }
        let addResult: string = "";
        for (let i = 0; i < stringLength; i++) {
            if (i % 2 === 1) {
                const digit = (parseInt(currentString[i]) + a) % 10;
                addResult += digit.toString();
            } else {
                addResult += currentString[i];
            }
        }
        const rotateResult: string = currentString.substring(stringLength - b) + 
                                     currentString.substring(0, stringLength - b);
        const transformedStrings: string[] = [addResult, rotateResult];
        for (const transformedString of transformedStrings) {
            if (!visited.has(transformedString)) {
                visited.add(transformedString);
                bfsQueue.push(transformedString);
            }
        }
    }
    return minString;
}
