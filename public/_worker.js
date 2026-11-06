// ponytail: /vectorcraft/ is served from R2 because its wasm is 85 MiB (Pages caps assets at 25 MiB).
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/vectorcraft") return Response.redirect(url.origin + "/vectorcraft/", 308);
    if (!url.pathname.startsWith("/vectorcraft/")) return env.ASSETS.fetch(request);

    let key = url.pathname.slice(1);
    if (key.endsWith("/")) key += "index.html";
    const obj = await env.VECTORCRAFT.get(key);
    if (!obj) return new Response("Not found", { status: 404 });

    const headers = new Headers();
    obj.writeHttpMetadata(headers);
    headers.set("etag", obj.httpEtag);
    headers.set("cache-control", key.endsWith("index.html") ? "no-cache" : "public, max-age=31536000, immutable");
    headers.set("x-content-type-options", "nosniff");
    return new Response(obj.body, { headers });
  },
};
