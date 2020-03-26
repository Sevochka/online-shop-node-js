const express = require("express");
const app = express();
const path = require("path");
var exphbs = require("express-handlebars");

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

//Объявить папку public статичной
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Главная страница",
        isHome:true
    });
});

app.get("/courses", (req, res) => {
    res.render("courses", {
        title: "Курсы",
        isCourses: true
    });
});

app.get("/add", (req, res) => {
    res.render("add", {
        title: "Добавить курс",
        isAdd: true
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
