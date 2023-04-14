import * as pathlib from "$std/path/mod.ts";
import conf from "$/conf/conf.ts";
// export function setMdDir(dir: string) {
//   mdDir = dir;
// }
export function getMdPath(uinfo: URL): [string, string] {
  // const uinfo = new URL(_req.url);
  const params = new URLSearchParams(uinfo.search);
  const uriPath = params.get("path") || "";
  const path = pathlib.join(conf.rootDir, uriPath);
  return [path, uriPath];
}

export function joinPath(dir: string, path: string): string {
  // return pathlib.join(dir, path).replace(/^\//, "");
  const r = pathlib.join(dir, path);
  return r;
}
