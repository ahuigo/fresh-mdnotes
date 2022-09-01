/** @jsx h */
import { createContext, h } from "preact";
import { Router } from "https://esm.sh/preact-router@4.1.0";
import * as React from "preact/hooks";
import DirTree from "./DirTree.tsx";
// import Hi from "http://m:4500/hi.tsx?14";

function ShowMarkdown({ path }: { path: string }) {
  return <div>island markdown:{path}</div>;
}

export default function () {
  return (
    <div class="p-4 mx-auto max-w-screen-md flex">
      <div class="bg-blue-500">
        <div>
          <nav>
            <a href="/api/joke">joke</a>
            <a href="/p/md1">md1</a>
            <a href="/p/md2">md1</a>
          </nav>
        </div>
        <DirTree path="." />
      </div>
      <div class="flex-1 bg-gray-100">
        <Router>
          <ShowMarkdown path="/p/:path*" />
        </Router>
      </div>
    </div>
  );
}
