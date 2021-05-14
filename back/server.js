const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const db = require("./db/index");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

const PORT = 8000;

db.sync({ force: false }).then(() => {
  console.log("conectada a la base de datos");
  app.listen(PORT, () => {
    console.log("Escuchando en el puerto ", PORT);
  });
});
