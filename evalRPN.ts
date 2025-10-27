function evalRPN(tokens: string[]): number {
    const operandStack: number[] = [];
    for (const token of tokens) {
        if (!isNaN(Number(token))) {
            operandStack.push(Number(token));
        } else {
            const rightOperand: number = operandStack.pop()!;
            const leftOperand: number = operandStack.pop()!;
            switch (token) {
                case '+':
                    operandStack.push(leftOperand + rightOperand);
                    break;
                case '-':
                    operandStack.push(leftOperand - rightOperand);
                    break;
                case '*':
                    operandStack.push(leftOperand * rightOperand);
                    break;
                case '/':
                    operandStack.push(Math.trunc(leftOperand / rightOperand));
                    break;
            }
        }
    }
    return operandStack[0];
}
