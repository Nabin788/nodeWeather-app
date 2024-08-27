const express = require("express");
const path = require("path");

const port = 1000;

const app = express();

// chnaging the default view path because index is within a htm folder
const viewPath = path.join(__dirname, "./views/html");

// to acces static file like css, js
// using middleware
const staticPath = path.join(__dirname, "./views");
app.use(express.static(staticPath))

// initialize template engine
app.set("view engine", "hbs");
// relocated views to viewPath
app.set("views", viewPath);

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(port, () => {
    console.log(`server is listening from port number:`, port);
});