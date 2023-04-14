/** @jsx h */
import { h } from "preact";
// import { Router } from "https://esm.sh/preact-router@4.1.0";
import MdView from "$/islands/MdView.tsx";
import DirTree from "$/islands/DirView.tsx";
import * as fs from "$/lib/fs.ts";

export const config = {
  csp: true,
};
type Props = {
  params: Record<string, string>;
  url: URL;
  route: string;
  data: unknown;
};
export default function Home(props: Props) {
  // console.log({ props });
  const [path] = fs.getMdPath(props.url);
  return (
    <div>
      <DirTree path="." />
      <MdView path={path} />
    </div>
  );
}
