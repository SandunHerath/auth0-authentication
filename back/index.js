var express = require("express");
var app = express();
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
const cors = require("cors");
const axios = require("axios");
var request = require("request");
app.use(cors());

var port = process.env.PORT || 5000;

app.post("/register", function (req, res) {
  console.log(req);
  res.send("got it");
});

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-43-hfsb7.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://dev-43-hfsb7.us.auth0.com/api/v2/",
  issuer: "https://dev-43-hfsb7.us.auth0.com/",
  algorithms: ["RS256"],
}).unless({ path: ["/"] });
app.use(jwtCheck);

app.get("/", function (req, res) {
  res.send("Hello normal route");
});

app.get("/protected", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const response = await axios.get(
      "https://dev-43-hfsb7.us.auth0.com/userInfo",
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

app.get("/perm", async (req, res) => {
  try {
    const r = await axios.post(
      "https://dev-43-hfsb7.us.auth0.com/oauth/token",
      '{"client_id":"4I4BmJRqJZs4gnBmyZ2OK7U5RJrYEx9K","client_secret":"2_cDXD8OQhsl8T6zraI_Rjjf33Wch1gNc4LROrPG2RyQNrEWpVoZffpPGN-sNG6I","audience":"https://dev-43-hfsb7.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
      { headers: { "content-type": "application/json" } }
    );
    const token = r.data.access_token;
  
    try {
      const res2 = await axios.get(
        `https://dev-43-hfsb7.us.auth0.com/api/v2/users`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res2.data);
      res.send(res2.data);
    } catch (error) {
      console.log(error.message);
    }
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
