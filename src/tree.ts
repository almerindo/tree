
import { TreeNode } from './treeNode';

export class Tree<T> {
  private root: TreeNode<T>;

  private currentNode: TreeNode<T>;

  constructor(rootValue: T) {
    if (rootValue === undefined || rootValue === null) {
      throw new Error('Root value cannot be undefined');
    }
    this.root = new TreeNode(rootValue);
    this.currentNode = this.root;
  }

  getRoot(): TreeNode<T> {
    return this.root;
  }

  getCurrent(): TreeNode<T> {
    return this.currentNode;
  }

  setCurrent(node: TreeNode<T>): void {
    this.currentNode = node;
  }

  /**
   * Navega para o próximo nó no mesmo nível (irmão).
   */
  next(): TreeNode<T> | null {
    if (!this.currentNode.parent) return null;
    const siblings = this.currentNode.parent.children;
    const currentIndex = siblings.indexOf(this.currentNode);
    if (currentIndex < siblings.length - 1) {
      this.currentNode = siblings[currentIndex + 1];
      return this.currentNode;
    }
    return null;
  }

  /**
   * Navega para o nó anterior no mesmo nível (irmão).
   */
  back(): TreeNode<T> | null {
    if (!this.currentNode.parent) return null;
    const siblings = this.currentNode.parent.children;
    const currentIndex = siblings.indexOf(this.currentNode);
    if (currentIndex > 0) {
      this.currentNode = siblings[currentIndex - 1];
      return this.currentNode;
    }
    return null;
  }

  /**
   * Percorre a árvore em diferentes estratégias de navegação.
   */
  walk(
    strategy: 'pre' | 'post' | 'in',
    callback: (node: TreeNode<T>) => void,
  ): void {
    const traversePreOrder = (node: TreeNode<T>) => {
      callback(node);
      node.children.forEach(traversePreOrder);
    };

    const traversePostOrder = (node: TreeNode<T>) => {
      node.children.forEach(traversePostOrder);
      callback(node);
    };

    const traverseInOrder = (node: TreeNode<T>) => {
      if (node.children.length > 0) {
        traverseInOrder(node.children[0]);
      }
      callback(node);
      for (let i = 1; i < node.children.length; i++) {
        traverseInOrder(node.children[i]);
      }
    };

    if (strategy === 'pre') {
      traversePreOrder(this.root);
    } else if (strategy === 'post') {
      traversePostOrder(this.root);
    } else if (strategy === 'in') {
      traverseInOrder(this.root);
    }
  }
}
