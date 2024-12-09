export class TreeNode<T> {
  value: T;

  children: TreeNode<T>[] = [];

  parent: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }

  addChild(child: TreeNode<T>): void {
    if (this.children.includes(child)) {
      throw new Error('The child already exists in this tree');
    }
    const newChild = child;
    newChild.parent = this;
    this.children.push(newChild);
  }

  isRoot(): boolean {
    return this.parent === null;
  }

  isLeaf(): boolean {
    return this.children.length === 0;
  }
}
