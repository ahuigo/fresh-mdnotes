/** @jsx h */
import { h } from "preact";
import { Router } from "https://esm.sh/preact-router@4.1.0";
import { StateUpdater, useEffect, useRef, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import * as pathlib from "$std/path/mod.ts";
// import { c } from "https://dev.jspm.io/npm:@jspm/core@1.1.1/nodelibs/chunk-0c2d1322.js";

const myd = [{ name: "post2", path: "post4", isFile: false, files: [] }];
// function useFetch<T>(fetcher: Promise<T>, init: T): [T, boolean] {
function useFetch<T>(url: string, init: T): [T, boolean] {
  const [state, setState] = useState<FileNode[] | T>(init);
  const isLoadingRef = useRef(false);
  console.log("render fetcher2");
  useEffect(() => {
    console.log("render fetcher inner");
    // setState([{ name: "post2", path: "post5", isFile: false, files: [] }]);
    fetchPathList(".").then((d) => {
      console.log(d);
      setState(d);
    });
    // Promise.resolve().then(() => {
    //   setState([{ name: "post2", path: "post4", isFile: false, files: [] }]);
    // });
  }, []);
  // console.log("usefetch rtn", { state });
  return [state, isLoadingRef.current] as [T, boolean];
  // return [state, isLoadingRef.current];
}

interface FileNode {
  name: string;
  path: string;
  isFile: boolean;
  files: FileNode[];
}

function readAllMdTree(dir = ".", depth = 5) {
  const files: FileNode[] = [];
  let dfiles: Deno.DirEntry[] = [];
  if (typeof Deno !== "undefined") {
    dfiles = [...Deno.readDirSync(dir)];
  } else {
    console.error("no deno runtime");
    return myd;
  }
  dfiles.forEach((file) => {
    if (file.name.startsWith(".")) {
      return false;
    }
    if (file.isFile && !file.name.endsWith(".md")) {
      return false;
    }
    let subFiles: FileNode[] = [];
    const path = pathlib.join(dir, file.name);
    if (file.isDirectory) {
      // subFiles = readAllMdTree(path);
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

function fetchPathList(path: string) {
  return fetch("/api/joke").then((d) => d.json()).then((data: {
    list: { name: string; isFile: string; path: string }[];
  }) => {
    return data.list.map((file) => {
      return file;
    });
  });
  // console.log({
  //   url: import.meta.url,
  //   main: Deno.mainModule,
  //   cwd: Deno.cwd(),
  // });
  const files = readAllMdTree(".");
  return Promise.resolve(files);
}

// const p = fetchPathList(".");
export default function DirTree({ path }: { path: string }) {
  // const [pathList] = useSwr.getPathList(path);
  // const pathList = ["path1", "path2"];
  const [pathList] = useFetch<FileNode[] | undefined>(path, undefined);
  // const [pathList] = useFetch2(path);
  const [c, setC] = useState(0);
  console.log("dirTree1", pathList);

  // return <div onClick={() => setC(c + 1)}>No file list{c}</div>;
  if (!pathList || pathList.length === 0) {
    return <div onClick={() => setC(c + 1)}>No file list{c}</div>;
  }
  return (
    <div>
      <ul class="">
        {pathList.map((fileNode) => {
          return (
            <li>
              {fileNode.path}
              {false && <DirTree path={path} />}
            </li>
          );
        })}
        {
          /* <li class="pure-menu-item" v-for="(file,index) in nodes">
      <a v-if="file.type==='dir'" :type="file.type" @click="openFolder(file)" class="folder">{{file.name}}
      </a>
      <tree-folder v-if="file.nodes" :show="file.show" :nodes="file.nodes"></tree-folder>
  </li> */
        }
      </ul>
    </div>
  );
}
