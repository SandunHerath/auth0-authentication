var express = require("express");
var app = express();
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
const cors = require("cors");
app.use(cors());

var port = process.env.PORT || 5000;

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-zgsgae4p.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://express.sample",
  issuer: "https://dev-zgsgae4p.us.auth0.com/",
  algorithms: ["RS256"],
}).unless({ path: ["/"] });
app.use(jwtCheck);

app.get("/", function (req, res) {
  res.send("Hello normal route");
});

app.get("/protected", function (req, res) {
  console.log(req.user);
  res.send("Hello from protected route");
});

app.use((req, res, next) => {
  const error = new Error("not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal server error";
  res.status(status).send(message);
});

app.listen(port, () => console.log("Server on port " + port));
