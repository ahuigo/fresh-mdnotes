#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
Deno.chdir("../rust-course");
await dev(import.meta.url, "./main.ts");
