function modifiedList(nums: number[], head: ListNode | null): ListNode | null {
    const valuesToRemove: Set<number> = new Set(nums);
    const dummyNode: ListNode = new ListNode(0, head);
    let predecessor: ListNode = dummyNode;
  
    while (predecessor.next !== null) {
        
        if (valuesToRemove.has(predecessor.next.val)) {
            
            predecessor.next = predecessor.next.next;
        } else {
            predecessor = predecessor.next;
        }
    }
    return dummyNode.next;
}
