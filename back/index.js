var express = require("express");
var app = express();
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
const cors = require("cors");
const axios = require("axios");
var request = require("request");
// const payhere = require("payhere-sdk");
app.use(cors());

var port = process.env.PORT || 5000;

app.post("/register", function (req, res) {
  console.log(req);
  res.send("got it");
});

app.get("/payment/:id", async (req, res) => {
  try {
    const id =req.params.id;
    console.log(id);
    const response = await axios.get(
      "https://sandbox.payhere.lk/merchant/v1/oauth/token/",{grant_type: "client_credentials"},
      {
        headers: {
          Authorization: 'Basic NE9WeDNhQVRyN280SkFkdVNVUFVaYzNYZzo0UFppM1Qwa3BCQjhRZVpYQ2ZQN2prNDhWSjBBRjZ2SHE0cDg3U3hEZHpsWg==',
           //grant_type: 'client_credentials',
          //"content-type": "application/json"
        }
      }
    );
    
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error.message);
  }
});

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-fnrh5opn.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://dev-fnrh5opn.us.auth0.com/api/v2/",
  issuer: "https://dev-fnrh5opn.us.auth0.com/",
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
      "https://dev-fnrh5opn.us.auth0.com/userInfo",
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
      "https://dev-fnrh5opn.us.auth0.com/oauth/token",
      '{"client_id":"FohheJnq3XD0UoJ8b7yXYMYfeFdxQHOw","client_secret":"B-ONnG9xgl5mJ82NHIS7YVzRuKOft1C4j0kQGPNO0yfOTdosBJgBNipXq0wdO4My","audience":"https://dev-fnrh5opn.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
      { headers: { "content-type": "application/json" } }
    );
    const token = r.data.access_token;

    try {
      const res2 = await axios.get(
        `https://dev-fnrh5opn.us.auth0.com/api/v2/users`,
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

//meeting
app.post("/meeting", (req, res) => {
  email = req.body.email;
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: "Meeting",
      type: 1,
      settings: {
        host_video: "true",
        participant_video: "true",
      },
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  rp(options)
    .then(function (response) {
      console.log("response is: ", response.join_url);
      // response.status(200).json(response);
      let dataRes = {
        join_url: response.join_url,
        meeting_password: response.encrypted_password,
        meeting_id: response.id,
      };
      console.log("response: ", dataRes);
      res.status(200).json(dataRes);

      // res.send("create meeting result: " + JSON.stringify(response));
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
});

app.get("/getSignature", (req, res) => {
  const key_signature = function generateSignature(
    apiKey,
    apiSecret,
    meetingNumber,
    role
  ) {
    const timestamp = new Date().getTime() - 30000;
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
      "base64"
    );
    const hash = crypto
      .createHmac("sha256", apiSecret)
      .update(msg)
      .digest("base64");
    const signature = Buffer.from(
      `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
    ).toString("base64");

    return signature;
  };
  res.status(200).json(key_signature);
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
