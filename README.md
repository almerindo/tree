<a href="https://www.buymeacoffee.com/almerindo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

[![TypeScript version][ts-badge]][typescript-38]
[![Node.js version][nodejs-badge]][nodejs]
[![APLv2][license-badge]][LICENSE]

# Tree Management Library

This library provides a structure for creating, managing, and navigating trees. It includes features to export trees to JSON and rebuild them from JSON.

---

## **Installation**

> **Note:** This library requires Node.js `>=14.0.0`.

### Using Yarn:
```bash
yarn add tree
```

### Using npm:
```bash
npm install tree
```

---

## **Usage**

### **Creating and Navigating the Tree**

```typescript
import { Tree, TreeNode } from 'tree';

// Creating a tree
const tree = new Tree<string>('Root');
const child1 = new TreeNode<string>('Child 1');
const child2 = new TreeNode<string>('Child 2');
tree.getRoot().addChild(child1);
tree.getRoot().addChild(child2);

const child1_1 = new TreeNode<string>('Child 1-1');
child1.addChild(child1_1);

// Navigating the tree
console.log('Current Node:', tree.getCurrent().value);
tree.setCurrent(child1);
console.log('Next Node:', tree.next()?.value);
console.log('Previous Node:', tree.back()?.value);

// Traversing the tree in pre-order
tree.walk('pre', (node) => console.log('Visiting:', node.value));
```

---

### **Exporting the Tree to JSON**

```typescript
import { Tree, TreeUtils } from 'tree';

const tree = new Tree<string>('Root');
const child1 = new TreeNode<string>('Child 1');
const child2 = new TreeNode<string>('Child 2');
tree.getRoot().addChild(child1);
tree.getRoot().addChild(child2);

// Exporting to JSON
const json = TreeUtils.exportToJSON(tree);
console.log(JSON.stringify(json, null, 2));
```

---

### **Rebuilding the Tree from JSON**

```typescript
import { TreeUtils } from 'tree';

const treeJSON = {
  value: 'Root',
  children: [
    { value: 'Child 1', children: [{ value: 'Child 1-1', children: [] }] },
    { value: 'Child 2', children: [] },
  ],
};

// Importing the tree
const importedTree = TreeUtils.importFromJSON(treeJSON);
console.log('Imported Tree Root:', importedTree.getRoot().value);
```

---

### **Features**

- **Tree Creation**: Create trees with nodes and children using simple classes.
- **Navigation**:
  - `next()`: Navigate to the next sibling node.
  - `back()`: Navigate to the previous sibling node.
- **Export to JSON**: Export your tree into a readable JSON format.
- **Rebuild Trees**: Reconstruct trees from JSON.
- **Tree Traversal**:
  - Available strategies: Pre-order (`pre`), Post-order (`post`), and In-order (`in`).

---

## **Testing**

The library includes robust tests for all functionalities using Jest.

### Running tests:

```bash
npx jest
```

---

## **TypeScript Configuration**

Ensure your environment supports TypeScript `>=3.8` and your `lib` is set to `es2016` or higher in your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "lib": ["es2016", "dom"]
  }
}
```

---

## **License**
See the [LICENSE](https://raw.githubusercontent.com/almerindo/tree/main/LICENSE) file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-3.8-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js-%3E=%2014.16-blue.svg
[nodejs]: https://nodejs.org/
[typescript]: https://www.typescriptlang.org/
[typescript-38]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html
[license-badge]: https://img.shields.io/badge/license-APLv2-blue.svg
[license]: https://raw.githubusercontent.com/almerindo/tree/main/LICENSE
```
