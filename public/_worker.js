// ponytail: /app/<name>/ is served from R2 because the wasm builds exceed Pages' 25 MiB asset cap.
const APPS = "vectorcraft|effectcraft|filmcraft|photocraft";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const m = url.pathname.match(new RegExp(`^/(?:app/)?(${APPS})(?:/(.*))?$`));
    if (!m) return env.ASSETS.fetch(request);

    const [, app, rest = ""] = m;
    if (!url.pathname.startsWith("/app/")) return Response.redirect(`${url.origin}/app/${app}/${rest}`, 308);
    if (!url.pathname.endsWith("/") && rest === "") return Response.redirect(`${url.origin}/app/${app}/`, 308);

    let key = `${app}/${rest}`;
    if (rest === "" || key.endsWith("/")) key += "index.html";
    const obj = await env.VECTORCRAFT.get(key);
    if (!obj) return new Response("Not found", { status: 404, headers: { "cache-control": "no-store" } });

    const headers = new Headers();
    obj.writeHttpMetadata(headers);
    headers.set("etag", obj.httpEtag);
    headers.set("cache-control", key.endsWith("index.html") ? "no-cache" : "public, max-age=31536000, immutable");
    headers.set("x-content-type-options", "nosniff");
    return new Response(obj.body, { headers });
  },
};
