import { data, testData } from "./data-7.js";

const calculateFileSizes = (data: string) => {
  const parsedData = parseCommands(data);

  return parsedData;

  // loop over commands

  // group all lines after $ ls until next $

  // add folder names to a set???

  // add all file sizes to the parents set

  // create tree node class???
};

interface FolderNode {
  parent: FolderNode;
  children: FolderNode[];
  size: number;
}

interface FolderAction {
  action: "cd" | "dir" | "ls";
}

const isCommandRegEx = new RegExp(/\$ (cd|ls)/);

// `dir` commands call the tree creation method
const isFolderRegEx = new RegExp(/dir (\w*\.?\w*)/);

// extracts file size file to add to folder size property
const isFileRegEx = new RegExp(/^(\d+) ([a-zA-Z]*(\.{1}[a-zA-Z]*)?)/);

// `cd` command traverses the tree
// `..` moves to parent node
// `[a-zA-Z]` accesses that child node

const parseCommands = (data: string) => {
  const dataArr = data.split("\n");
  for (const item of dataArr) {
  }
};

interface File {
  name: string;
  size: number;
}

class FolderTree {
  folderName: string;
  folders: FolderTree[];
  files: File[];

  constructor(
    folderName: string,
    folders: FolderTree[] = [],
    files: File[] = []
  ) {
    this.folderName = folderName;
    this.folders = folders;
    this.files = files;
  }

  addFolder(folderName: string): void {
    this.folders.push(new FolderTree(folderName));
  }

  addFile(fileName: string, size: number): void {
    this.files.push({ name: fileName, size });
  }

  removeFolder(folderName: string): void {
    this.folders = this.folders.filter(
      (folder: FolderTree) => folder.folderName !== folderName
    );
  }

  removeFile(fileName: string): void {
    this.files = this.files.filter((file: File) => file.name !== fileName);
  }

  totalFileSizes(): number {
    let totalSize = 0;

    if (this.files.length) {
      totalSize = this.files.reduce((total, file) => total + file.size, 0);
    }

    return totalSize;
  }
}

function traverseFolderTree(folderTree: FolderTree): void {
  console.log(`Traversing folder: ${folderTree.folderName}`);

  // Iterate over folders
  for (let folder of folderTree.folders) {
    traverseFolderTree(folder);
  }

  // Iterate over files
  for (let file of folderTree.files) {
    console.log(`File: ${file.name} - Size: ${file.size}`);
  }
}

const folders = new FolderTree('root')
folders.addFolder('1')
folders.addFolder('2')
folders.addFolder('3')
folders.addFile('file1', 50)
folders.addFile('file2', 500)
console.log(folders.totalFileSizes())


console.log(calculateFileSizes(testData));
