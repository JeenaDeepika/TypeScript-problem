interface TrieNode {
    children: { [key: string]: TrieNode };
    deleted: boolean;
}

function deleteDuplicateFolder(paths: string[][]): string[][] {
    const root: TrieNode = {
        children: {},
        deleted: false
    };
    for (const path of paths) {
        let currentNode = root;
        for (const folderName of path) {
            if (!currentNode.children[folderName]) {
                currentNode.children[folderName] = {
                    children: {},
                    deleted: false
                };
            }
            currentNode = currentNode.children[folderName];
        }
    }
    const subtreeMap: { [serialized: string]: TrieNode } = {};
    const serializeAndMarkDuplicates = (node: TrieNode): string => {
        if (Object.keys(node.children).length === 0) {
            return '';
        }
        const serializedChildren: string[] = [];
        for (const [folderName, childNode] of Object.entries(node.children)) {
            const childSerialization = serializeAndMarkDuplicates(childNode);
            serializedChildren.push(`${folderName}(${childSerialization})`);
        }
        serializedChildren.sort();
        const serializedSubtree = serializedChildren.join('');
        if (subtreeMap[serializedSubtree]) {
            node.deleted = true;
            subtreeMap[serializedSubtree].deleted = true;
        } else {
            subtreeMap[serializedSubtree] = node;
        }
        return serializedSubtree;
    };
    serializeAndMarkDuplicates(root);
    const result: string[][] = [];
    const currentPath: string[] = [];
    const collectRemainingPaths = (node: TrieNode): void => {
        if (node.deleted) {
            return;
        }
        if (currentPath.length > 0) {
            result.push([...currentPath]);
        }
        for (const [folderName, childNode] of Object.entries(node.children)) {
            currentPath.push(folderName);
            collectRemainingPaths(childNode);
            currentPath.pop();
        }
    };
    collectRemainingPaths(root);
    return result;
}
