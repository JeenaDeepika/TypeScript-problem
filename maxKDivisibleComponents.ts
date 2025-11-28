function maxKDivisibleComponents(
    n: number,
    edges: number[][],
    values: number[],
    k: number,
): number {
    const adjacencyList: number[][] = Array.from({ length: n }, () => []);
    for (const [nodeA, nodeB] of edges) {
        adjacencyList[nodeA].push(nodeB);
        adjacencyList[nodeB].push(nodeA);
    }
    let componentCount: number = 0;
    const dfs = (currentNode: number, parentNode: number): number => {
        let subtreeSum: number = values[currentNode];
        for (const adjacentNode of adjacencyList[currentNode]) {
            if (adjacentNode !== parentNode) {
                subtreeSum += dfs(adjacentNode, currentNode);
            }
        }
        if (subtreeSum % k === 0) {
            componentCount++;
        }
        return subtreeSum;
    };
    dfs(0, -1);
    return componentCount;
}
