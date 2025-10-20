function finalValueAfterOperations(operations: string[]): number {
    return operations.reduce((accumulator: number, operation: string) => {
        return accumulator + (operation[1] === '+' ? 1 : -1);
    }, 0);
}
