import { Tree } from '../tree';
import { TreeNode } from '../treeNode';
import { TreeUtils } from '../treeUtils';

describe('TreeUtils', () => {
  it('should export a tree to JSON', () => {
    const tree = new Tree('Root');
    const child1 = new TreeNode('Child 1');
    const child2 = new TreeNode('Child 2');
    tree.getRoot().addChild(child1);
    tree.getRoot().addChild(child2);

    const json = TreeUtils.exportToJSON(tree);
    expect(json).toEqual({
      value: 'Root',
      children: [
        { value: 'Child 1', children: [] },
        { value: 'Child 2', children: [] },
      ],
    });
  });

  it('should import a tree from JSON', () => {
    const json = {
      value: 'Root',
      children: [
        { value: 'Child 1', children: [{ value: 'Child 1-1', children: [] }] },
        { value: 'Child 2', children: [] },
      ],
    };

    const tree = TreeUtils.importFromJSON(json);
    expect(tree.getRoot().value).toBe('Root');
    expect(tree.getRoot().children[0].value).toBe('Child 1');
    expect(tree.getRoot().children[1].value).toBe('Child 2');
    expect(tree.getRoot().children[0].children[0].value).toBe('Child 1-1');
  });
});
