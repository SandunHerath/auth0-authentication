var express = require("express");
var app = express();
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
const cors = require("cors");
const axios = require("axios");
app.use(cors());

var port = process.env.PORT || 5000;

app.post("/register", function (req, res) {
  console.log(req);
  res.send("got it");
});

// var jwtCheck = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: "https://dev-zgsgae4p.us.auth0.com/.well-known/jwks.json",
//   }),
//   audience: "sandunherath124@gmail.com",
//   issuer: "https://dev-zgsgae4p.us.auth0.com/",
//   algorithms: ["RS256"],
// }).unless({ path: ["/"] });
// app.use(jwtCheck);

app.get("/", function (req, res) {
  res.send("Hello normal route");
});

app.get("/protected", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const response = await axios.get(
      "https://dev-zgsgae4p.us.auth0.com/userInfo",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(token);
    const userInfo = response.data;
    res.send(userInfo);
  } catch (error) {
    console.log(error.message);
  }
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
