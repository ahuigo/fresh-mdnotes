/** @jsx h */
import { h } from "preact";
import useFetch from "$/lib/useFetch.ts";
// import Hi from "http://m:4502/hi.tsx?ver=7";
// import * as React from "preact/hooks";

export default function ({ path }: { path: string }) {
  const [text, isOk] = useFetch<string>(
    "/api/joke?path=advance/global-variable.md",
    { initValue: "", dataType: "text" },
  );

  if (!isOk) return <div>loading....</div>;

  return (
    <div class="flex-1 bg-gray-100">
      {/* <Hi name="ahuigo" /> */}
      <div>island markdown:{path}</div>
      <div>island markdown:<pre class="border-2">{text}</pre></div>
    </div>
  );
}
