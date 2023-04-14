/** @jsx h */
import { h } from "preact";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import useFetch, { usePromise, usePromise2 } from "$/lib/useFetch.ts";
import * as pathlib from "$std/path/mod.ts";
interface FileNode {
  name: string;
  path: string;
  isFile: boolean;
  files?: FileNode[];
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

export function ShowDirTree({ files }: { files: FileNode[]; }) {
  // const [c, setC] = useState(0);
  return (
    <div>
      <ul class="">
        {files.map((fileNode) => {
          return (
            <li>
              {fileNode.name}
              {fileNode.files?.length && <ShowDirTree files={fileNode.files} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function DirView({ path }: { path: string; }) {
  // "/api/joke?path=advance/global-variable.md",
  // const [fileNodes, isOk] = useFetch<FileNode[]>(
  //   `/api/joke?path=${path}`,
  //   { initValue: [] },
  //   "list",
  // );
  const [fileNodes, isOk] = usePromise(
    () => {
      return fetch(`/api/joke?path=${path}`).then(async (r) => {
        return await r.json();
      }) as Promise<{ list: FileNode[]; }>;
    },
    { initValue: [] },
    "list",
  );
  //
  console.log({ fileNodes });
  const [data, isOk2] = usePromise(
    () => {
      return fetch(`/api/joke?path=${path}`).then(async (r) => {
        return await r.json();
      }) as Promise<FileNode[]>;
    },
    { initValue: [] },
  );

  // const files = useMemo(() => readAllMdTree("./src/" + path, 1), []);
  // const files = useMemo(() => readAllMdTree("./src/" + path, 1), []);
  // console.log("ahui", files);
  // return <ShowDirTree files={files} />;
  if (!isOk) {
    return <div>......</div>;
  }
  return (
    <div>
      {fileNodes.map((fileNode) => {
        return <div key={fileNode.path}>{fileNode.name}</div>;
      })}
    </div>
  );
}
