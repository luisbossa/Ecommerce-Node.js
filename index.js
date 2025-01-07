const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const path = require("path");
const cors = require("cors");

const app = express();

// Middlewares
app.use(ejsLayouts);
app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Servir archivos estáticos con caché
app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: "1y", // Cache durante 1 año
    etag: false,
  })
);

// Routes
app.use(require("./routes/indexRoute"));
app.use(require("./routes/cartRoute"));

// connection
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`port running in http://localhost:${port}`);
});
