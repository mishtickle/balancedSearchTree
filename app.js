const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

class node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class tree{
    constructor(inputArray){
        this.root = this.buildTree(inputArray, 0, inputArray.length - 1);
        prettyPrint(this.root);
    }

    buildTree(inputArray, start, end){
        if (start > end) return null;

        let mid = parseInt((start+end) /2);
        let root = new node(inputArray[mid])

        root.left = this.buildTree(inputArray, start, mid - 1);
        root.right = this.buildTree(inputArray, mid+1, end);
        prettyPrint(root);
        return root
    }

    insert(value){
        let newNode = new node(value);

        if (!this.root){
            this.root = newNode;
            return this;
        }

        let binaryTree = this.root;

        while(true){
            console.log(binaryTree.data);    
            if (value === binaryTree.data){
                return;
            } else if (value < binaryTree.data){
                if (!binaryTree.left){
                    binaryTree.left = newNode;
                    prettyPrint(this.root);
                    return this;
                }
                binaryTree = binaryTree.left;
            } else {
                if (!binaryTree.right){
                    binaryTree.right = newNode;
                    prettyPrint(this.root);
                    return this
                }
                binaryTree = binaryTree.right;
            }
        }
        
    }

    find(value){
        if(!this.root){
            return false;
        }
        let currentNode = this.root;

        while(currentNode){
            if (value == currentNode.data){
                console.log(`Value ${value} is present`);
                return currentNode;
            }
            else if (value < currentNode.data){
                currentNode = currentNode.left;
            }else if (value > currentNode.data) {
                currentNode = currentNode.right;
            }
        }
        console.log(`Value ${value} is not present`);
        return false;
    }

    delete(value){
        if (!this.root){
            return false;
        }

        let currentNode = this.root;
        let parentNode = null;

        while(currentNode){            
            if (value < currentNode.data){
                parentNode = currentNode;
                currentNode = currentNode.left;
                }
            else if (value > currentNode.data){
                parentNode = currentNode;
                currentNode = currentNode.right;
                }
            else if (value == currentNode.data){
                //if it's a leaf, delete it
                if (currentNode.right == null && currentNode.left == null){
                    if (parentNode.left == currentNode){
                        parentNode.left = null;
                        break;
                    }    
                    if (parentNode.right == currentNode){
                        parentNode.right = null;
                        break;
                    }
                }
                // if there's one node to the left or one node to the right of the current node, make the parent point to the child of the current node
                if (currentNode.left == null && currentNode.right != null){
                    if (parentNode.right == currentNode){
                        parentNode.right = currentNode.right;
                        break;
                    }
                    if (parentNode.left == currentNode){
                        parentNode.left = currentNode.right;
                        break;
                    }
                }
                if (currentNode.left != null && currentNode.right == null){
                    if (parentNode.right == currentNode){
                        parentNode.right = currentNode.left;
                        break;
                    }
                    if (parentNode.left == currentNode){
                        parentNode.left == currentNode.left;
                        break;
                    }
                }
                // if the node has two children, make the current node point to the leftmost node of the right node
                if (currentNode.left != null && currentNode.right != null){
                    let swapNode = currentNode;
                    let firstRight = swapNode.right;
                    if (!firstRight.left){
                        swapNode.data = firstRight.data;
                        swapNode.right = firstRight.right;
                        break;
                    }
                    let leftMost = firstRight;
                    while (leftMost.left){
                        parentNode = leftMost;
                        leftMost = leftMost.left;
                    }
                    swapNode.data = leftMost.data;
                    parentNode.left = null;
                    break;
                }
                
            }
        }
        prettyPrint(this.root);
    }  

    levelOrder(){
        let Q = [];
        let rootNode = this.root;
        let current;
        if (rootNode == null){
            return false;
        }
        Q.push(rootNode);
        while (Q.length != 0){
            current = Q[0];
            if (current.left != null){
                Q.push(current.left);
            }
            if (current.right != null){
                Q.push(current.right);
            }
            console.log(current.data);
            let front = Q.shift();
        }
    }
    
    inorder(rootNode){
        if (rootNode == null){
            return false;
        }  
        this.inorder(rootNode.left);
        console.log(rootNode.data);
        this.inorder(rootNode.right); 
    }

    preorder(rootNode){
        if (rootNode == null){
            return;
        }
        console.log(rootNode.data)
        this.preorder(rootNode.left);
        this.preorder(rootNode.right);
    }

    postorder(rootNode){
        if (rootNode == null){
            return;
        }
        this.postorder(rootNode.left);
        this.postorder(rootNode.right);
        console.log(rootNode.data);
    }

    height(rootNode){
        if (rootNode == null){
            return -1;
        }

        let leftHeight = this.height(rootNode.left);
        let rightHeight = this.height(rootNode.right);
        if (leftHeight > rightHeight){
            return leftHeight +1
        } else {
            return rightHeight + 1
        }
    }

    depth(node){
        let current = this.root;
        let depth = 0;
        while (current.data != node){
            if (node < current){
                current = current.left;
                depth++;
            } else{
                current = current.right;
                depth++;
            }
        }
        return depth;
    }
}

function compareNumbers(a, b){
    return a - b;
}

function organise(inputArray){
    // sort the list
    inputArray = inputArray.sort(compareNumbers);
    // remove duplicates
    let unique = [...new Set(inputArray)];
    return unique;
}

let newArray = organise([7,6,5,4,4,4,3,2,1]);
console.log(newArray)
balancedBST = new tree(newArray, 1, newArray.length);
balancedBST.insert(10);
balancedBST.insert(9);
balancedBST.insert(8);
balancedBST.insert(11);
balancedBST.find(5);
balancedBST.delete(6);
balancedBST.delete(7);
balancedBST.delete(6);
console.log('levelorder:')
balancedBST.levelOrder();
rootNode = balancedBST.root;
console.log('inorder:')
balancedBST.inorder(rootNode);
console.log('preorder:')
balancedBST.preorder(rootNode);
console.log('postorder:');
balancedBST.postorder(rootNode);
let theHeight = balancedBST.height(rootNode);
console.log(`The height is: ${theHeight}`);
let depth = balancedBST.depth(10);
console.log(`The depth is ${depth}`)



