import { HandlerContext } from "$fresh/server.ts";

// Jokes courtesy of https://punsandoneliners.com/randomness/programmer-jokes/
export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  const r = Deno.readDirSync(".");
  const uinfo = new URL(_req.url);
  const res = JSON.stringify({
    u: Deno.mainModule,
    url: _req.url,
    list: [...r],
  });
  return new Response(res);
};
