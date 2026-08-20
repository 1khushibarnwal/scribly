import { createServer, request } from "http";

const TARGET_HOST = "localhost";
const TARGET_PORT = 5001;

const proxy = createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  const options = {
    hostname: TARGET_HOST,
    port: TARGET_PORT,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      "x-my-proxy": "hello-from-proxy",
    },
  };

  console.log("Forwarding request to backend...");
  const proxyReq = request(options, (proxyRes) => {
    console.log("Received response from backend:", proxyRes.statusCode);

    res.writeHead(proxyRes.statusCode, proxyRes.headers);

    proxyRes.pipe(res);
  });

  proxyReq.on("error", (error) => {
    console.error("Proxy error:", error);

    res.writeHead(502, {
      "Content-Type": "text/plain",
    });

    res.end("Bad Gateway");
  });

  req.pipe(proxyReq);
});

proxy.listen(3001, () => {
  console.log("Proxy running on http://localhost:3001");
});
