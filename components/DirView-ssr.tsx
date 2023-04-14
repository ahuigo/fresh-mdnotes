/** @jsx h */
import { h } from "preact";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
// import * as fs from "$/lib/fs.ts";
import * as pathlib from "$std/path/mod.ts";
interface FileNode {
  name: string;
  path: string;
  isFile: boolean;
  files: FileNode[];
}

function readAllMdTree(path = ".", depth = 3) {
  const files: FileNode[] = [];
  const dfiles = Deno.readDirSync(path);
  [...dfiles].map((file) => {
    if (file.name.startsWith(".")) {
      return false;
    }
    if (file.isFile && !file.name.endsWith(".md")) {
      return false;
    }
    let subFiles: FileNode[] = [];
    const subpath = pathlib.join(path, file.name);
    if (file.isDirectory && depth > 1) {
      subFiles = readAllMdTree(subpath, depth - 1);
    }
    files.push({
      name: file.name,
      path: path,
      isFile: file.isFile,
      files: subFiles,
    });
  });
  return files;
}

export function ShowDirTree({ files }: { files: FileNode[] }) {
  // const [c, setC] = useState(0);
  return (
    <div>
      <ul class="">
        {files.map((fileNode) => {
          return (
            <li>
              {fileNode.name}
              {fileNode.files?.length > 0 && (
                <ShowDirTree files={fileNode.files} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function DirTree({ path }: { path: string }) {
  // const files = useMemo(() => readAllMdTree("./src/" + path, 1), []);
  const files = useMemo(() => readAllMdTree("./src/" + path, 1), []);
  // console.log("ahui", files);
  return <ShowDirTree files={files} />;
}
