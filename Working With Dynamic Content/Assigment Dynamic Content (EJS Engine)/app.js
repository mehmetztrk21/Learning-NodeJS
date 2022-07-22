const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const userData = require("./routes/users");
const homeRoutes = require("./routes/home");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(userData.routes);
app.use(homeRoutes);



app.use((req, res, next) => {
    res.status(404).render("404", { pageTitle: "Not Found", path: null });
})

app.listen(3000);