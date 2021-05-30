const http = require("http");
const app = require("./back-end/routes/serviceBus");

const port = process.env.PORT || 3000;
console.log("Server: Porta " + port)
app.set("port", port);
const server = http.createServer(app);
server.listen(port);