/** @jsx h */
import { h } from "preact";
import MdView from "$/islands/MdView.tsx";
import { Head } from "$fresh/runtime.ts";

// import { Router } from "https://esm.sh/preact-router@4.1.0";
// import DirTree from "$/islands/DirTree.tsx";
// function ShowMarkdown({ path }: { path: string }) {
//   return <div>ssr:{path}</div>;
// }
export const config = {
  csp: true,
};
export default function Home() {
  return (
    <div>
      <Head>
        <meta name="description" content="layout _app.tsx!" />
      </Head>
      <MdView />
    </div>
  );
}
