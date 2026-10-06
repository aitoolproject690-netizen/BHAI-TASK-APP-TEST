import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { join } from "node:path";

const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 19100);
const root = join(process.cwd(), "dist");

const server = createServer(async (req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: true, service: "bhai-task-app-test" }));
    return;
  }

  if (req.method !== "GET" || req.url !== "/") {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not Found");
    return;
  }

  const file = join(root, "index.html");

  try {
    await stat(file);
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    createReadStream(file).pipe(res);
  } catch {
    res.writeHead(503, { "content-type": "text/plain; charset=utf-8" });
    res.end("Build artifact unavailable");
  }
});

server.listen(port, host, () => {
  console.log("BHAI Garage test app listening on " + host + ":" + port);
});
