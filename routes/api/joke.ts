import { HandlerContext } from "$fresh/server.ts";
import * as fs from "$/lib/fs.ts";

async function generateEtag(name: string) {
  const encoder = new TextEncoder();
  const etag = await crypto.subtle.digest(
    "SHA-1",
    encoder.encode(name),
  ).then((hash) =>
    Array.from(new Uint8Array(hash))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")
  );
  return etag;
}

// Jokes courtesy of https://punsandoneliners.com/randomness/programmer-jokes/
export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const uinfo = new URL(req.url);
  const url = new URL(req.url);
  // const params = new URLSearchParams(url.search);
  // const path = params.get("path") || ".";
  const [fpath, uriPath] = fs.getMdPath(uinfo);
  const file = await Deno.open(fpath);
  const stat = await file.stat();
  const ifModifiedSince = req.headers.get("if-modified-since")!;
  const isNotModified = ifModifiedSince &&
    (new Date(ifModifiedSince)) >= stat.mtime!;
  if (isNotModified) {
    return new Response(null, { status: 304 });
  }

  if (url.search.includes("useCache")) {
    const location = url.pathname + url.search;
    return new Response("", {
      status: 307,
      headers: {
        "content-type": "text/plain",
        location,
      },
    });
  }
  const etag = await generateEtag(url.pathname);
  const headers = new Headers({
    "content-type": "text/plain",
    etag,
    vary: "If-None-Match",
  });
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  const ifNoneMatch = req.headers.get("if-none-match");
  if (ifNoneMatch === etag || ifNoneMatch === "W/" + etag) {
    console.log("aaa1");
    return new Response(null, { status: 304, headers });
  }
  if (stat.isFile) {
    headers.set("content-length", String(stat.size));
    return new Response(file.readable, { headers });
  } else {
    const files = Deno.readDirSync(fpath);
    const res = JSON.stringify({
      list: [...files].map((file) => {
        return {
          isFile: file.isFile,
          path: fs.joinPath(uriPath, file.name),
          name: file.name,
        };
      }),
    });
    return new Response(res);
  }
};
