const express = require("express");

// Takes care of the CORS error
var cors = require("cors");

const appRoutes = require("./routes/app-routes");

const HttpError = require("./util/http-error");

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Takes care of header
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Role"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/", appRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  if (error.code >= 100 && error.code < 600) res.status(error.code);
  else res.status(500);
  return res.json({ "error": error.message || "An unknown error occurred!" });
});

try {
  let port = 5000;
  app.listen(port);
  console.log(`Listening at port ${port}`);

} catch (err) {
  console.log(err);
}
