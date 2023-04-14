/** @jsx h */
import { h } from "preact";
import { RouteConfig } from "$fresh/server.ts";

export const config: RouteConfig = {
  routeOverride: "/context",
};

import Demo from "../islands/demo-context.tsx";

export default function Home() {
  return <Demo />;
}
