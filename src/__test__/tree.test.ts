import { Tree } from '../tree';
import { TreeNode } from '../treeNode';
import { TreeUtils } from '../treeUtils';

describe('Tree', () => {
  it('should navigate to next sibling', () => {
    const tree = new Tree('Root');
    const child1 = new TreeNode('Child 1');
    const child2 = new TreeNode('Child 2');
    tree.getRoot().addChild(child1);
    tree.getRoot().addChild(child2);

    tree.setCurrent(child1);
    const next = tree.next();
    expect(next?.value).toBe('Child 2');
  });

  it('should navigate to previous sibling', () => {
    const tree = new Tree('Root');
    const child1 = new TreeNode('Child 1');
    const child2 = new TreeNode('Child 2');
    tree.getRoot().addChild(child1);
    tree.getRoot().addChild(child2);

    tree.setCurrent(child2);
    const back = tree.back();
    expect(back?.value).toBe('Child 1');
  });

  it('should return null when no sibling exists', () => {
    const tree = new Tree('Root');
    const child = new TreeNode('Child');
    tree.getRoot().addChild(child);

    tree.setCurrent(child);
    expect(tree.next()).toBeNull();
    expect(tree.back()).toBeNull();
  });

  it('should traverse the tree in pre-order', () => {
    const tree = new Tree('Root');
    const child1 = new TreeNode('Child 1');
    const child2 = new TreeNode('Child 2');
    const child1_1 = new TreeNode('Child 1-1');
    tree.getRoot().addChild(child1);
    tree.getRoot().addChild(child2);
    child1.addChild(child1_1);

    const traversal: string[] = [];
    tree.walk('pre', node => traversal.push(node.value));
    expect(traversal).toEqual(['Root', 'Child 1', 'Child 1-1', 'Child 2']);
  });

  it('should throw error when adding duplicate child', () => {
    const tree = new Tree('Root');
    const child = new TreeNode('Child');
    tree.getRoot().addChild(child);

    expect(() => tree.getRoot().addChild(child)).toThrow(
      'The child already exists in this tree',
    );
  });
});

describe('Tree Initialization', () => {
  it('should initialize tree with root node', () => {
    const tree = new Tree('Root');
    expect(tree.getRoot().value).toBe('Root');
    expect(tree.getCurrent().value).toBe('Root');
  });

  it('should throw error if root value is undefined', () => {
    expect(() => new Tree(undefined as unknown as string)).toThrow(
      'Root value cannot be undefined',
    );
  });

  it('should initialize tree with complex types as root value', () => {
    const tree = new Tree({ id: 1, name: 'Root' });
    expect(tree.getRoot().value).toEqual({ id: 1, name: 'Root' });
  });
});


describe('TreeNode', () => {
  it('should identify root node', () => {
    const root = new TreeNode('Root');
    expect(root.isRoot()).toBeTruthy();
    const child = new TreeNode('Child');
    root.addChild(child);
    expect(child.isRoot()).toBeFalsy();
  });

  it('should identify leaf node', () => {
    const root = new TreeNode('Root');
    const child = new TreeNode('Child');
    root.addChild(child);
    expect(child.isLeaf()).toBeTruthy();
    expect(root.isLeaf()).toBeFalsy();
  });
});

describe('TreeUtils', () => {
  it('should export a tree with nested children to JSON', () => {
    const tree = new Tree('Root');
    const child1 = new TreeNode('Child 1');
    const child2 = new TreeNode('Child 2');
    const child1_1 = new TreeNode('Child 1-1');
    tree.getRoot().addChild(child1);
    tree.getRoot().addChild(child2);
    child1.addChild(child1_1);

    const json = TreeUtils.exportToJSON(tree);
    expect(json).toEqual({
      value: 'Root',
      children: [
        {
          value: 'Child 1',
          children: [{ value: 'Child 1-1', children: [] }],
        },
        { value: 'Child 2', children: [] },
      ],
    });
  });

  it('should handle empty children when importing JSON', () => {
    const json = {
      value: 'Root',
      children: [{ value: 'Child 1', children: [] }],
    };
    const tree = TreeUtils.importFromJSON(json);

    expect(tree.getRoot().value).toBe('Root');
    expect(tree.getRoot().children[0].value).toBe('Child 1');
    expect(tree.getRoot().children[0].children).toEqual([]);
  });
});

describe('Tree Navigation - Edge Cases', () => {
  it('should return null for next() if no siblings exist', () => {
    const tree = new Tree('Root');
    const child = new TreeNode('Only Child');
    tree.getRoot().addChild(child);

    tree.setCurrent(child);
    expect(tree.next()).toBeNull();
  });

  it('should return null for back() if no siblings exist', () => {
    const tree = new Tree('Root');
    const child = new TreeNode('Only Child');
    tree.getRoot().addChild(child);

    tree.setCurrent(child);
    expect(tree.back()).toBeNull();
  });

  it('should handle walk with empty tree', () => {
    const tree = new Tree('Root');

    const traversal: string[] = [];
    tree.walk('pre', node => traversal.push(node.value));
    expect(traversal).toEqual(['Root']);
  });

  it('should traverse tree in post-order', () => {
    const tree = new Tree('Root');
    const child1 = new TreeNode('Child 1');
    const child2 = new TreeNode('Child 2');
    const child1_1 = new TreeNode('Child 1-1');
    tree.getRoot().addChild(child1);
    tree.getRoot().addChild(child2);
    child1.addChild(child1_1);

    const traversal: string[] = [];
    tree.walk('post', node => traversal.push(node.value));
    expect(traversal).toEqual(['Child 1-1', 'Child 1', 'Child 2', 'Root']);
  });

  it('should traverse tree in in-order', () => {
    const tree = new Tree('Root');
    const child1 = new TreeNode('Child 1');
    const child2 = new TreeNode('Child 2');
    const child1_1 = new TreeNode('Child 1-1');
    tree.getRoot().addChild(child1);
    tree.getRoot().addChild(child2);
    child1.addChild(child1_1);

    const traversal: string[] = [];
    tree.walk('in', node => traversal.push(node.value));
    expect(traversal).toEqual(['Child 1-1', 'Child 1', 'Root', 'Child 2']);
  });

  it('should return null for next() if current node is the root', () => {
    const tree = new Tree('Root');

    tree.setCurrent(tree.getRoot());
    expect(tree.next()).toBeNull(); // Linha 30 coberta
  });

  it('should return null for back() if current node is the root', () => {
    const tree = new Tree('Root');

    tree.setCurrent(tree.getRoot());
    expect(tree.back()).toBeNull(); // Linha 44 coberta
  });
});
