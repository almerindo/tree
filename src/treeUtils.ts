import { Tree } from './tree';
import { TreeNode } from './treeNode';

export interface TreeNodeJSON<T> {
  value: T;
  children?: TreeNodeJSON<T>[];
}

export class TreeUtils {
  /**
   * Exporta a árvore para JSON.
   */
  static exportToJSON<T>(tree: Tree<T>): TreeNodeJSON<T> {
    const buildJSON = (node: TreeNode<T>): TreeNodeJSON<T> => {
      return {
        value: node.value,
        children: node.children.map(buildJSON),
      };
    };

    return buildJSON(tree.getRoot());
  }

  /**
   * Reconstrói uma árvore a partir de JSON.
   */
  static importFromJSON<T>(data: TreeNodeJSON<T>): Tree<T> {
    const buildTree = (nodeData: TreeNodeJSON<T>): TreeNode<T> => {
      const node = new TreeNode(nodeData.value);
      if (nodeData.children) {
        node.children = nodeData.children.map(buildTree);
      }
      return node;
    };

    const rootNode = buildTree(data);
    const tree = new Tree(rootNode.value);
    tree.getRoot().children = rootNode.children;
    return tree;
  }
}
