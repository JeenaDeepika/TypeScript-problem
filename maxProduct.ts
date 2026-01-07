function maxProduct(root: TreeNode | null): number {
    const sum = (root: TreeNode | null): number => {
        if (!root) {
            return 0;
        }
        return root.val + sum(root.left) + sum(root.right);
    };
    const s = sum(root);
    let ans = 0;
    const mod = 1e9 + 7;
    const dfs = (root: TreeNode | null): number => {
        if (!root) {
            return 0;
        }
        const t = root.val + dfs(root.left) + dfs(root.right);
        if (t < s) {
            ans = Math.max(ans, t * (s - t));
        }
        return t;
    };
    dfs(root);
    return ans % mod;
}
