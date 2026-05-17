interface RedirectEntry {
  sourcePath: string;
  targetPath: string;
  type: "301" | "302" | "rewrite";
}

const redirectMap: RedirectEntry[] = [
  { sourcePath: "/trial", targetPath: "/get-started/demo", type: "rewrite" },
  { sourcePath: "/pricing-enterprise", targetPath: "/pricing?plan=enterprise", type: "302" },
  { sourcePath: "/platform/old-security-overview", targetPath: "/platform/security/control-plane", type: "301" }
];

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const match = redirectMap.find((entry) => entry.sourcePath === url.pathname);

    if (!match) {
      return new Response("No redirect match", { status: 404 });
    }

    if (match.type === "rewrite") {
      url.pathname = match.targetPath;
      return fetch(url.toString(), request);
    }

    return Response.redirect(new URL(match.targetPath, url.origin).toString(), match.type === "301" ? 301 : 302);
  }
};
