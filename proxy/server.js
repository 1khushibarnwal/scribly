import { createServer } from "http";

const server = createServer((req, res) => {
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Headers:", req.headers);

  res.writeHead(200, {
    "Content-Type": "text/plain",
  });

  res.end("Hello from proxy!");
});

server.listen(3001, () => {
  console.log("Proxy listening on http://localhost:3001");
});
