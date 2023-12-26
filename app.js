const express = require("express");
const app = express();
const port = process.env.PORT || 3005;
const router = require("./routes/index");
const session = require("express-session");

app.use(express.static("uploads"));
app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());
app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
